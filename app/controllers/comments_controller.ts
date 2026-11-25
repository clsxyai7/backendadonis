import Comment from '#models/comment'
import Student from '#models/student'
import CommentPolicy from '#policies/comment_policy'
import { commentValidator } from '#validators/comment'
import { Bouncer } from '@adonisjs/bouncer'
import type { HttpContext } from '@adonisjs/core/http'
import { create } from 'node:domain'

export default class CommentsController {
  /**
   * Display a list of resource
   */
  async index({params,response}: HttpContext) {
    const student = await Student.findOrFail(params.student_id)
    await student.load('comments',(query)=>
    {
      query.preload('teacher')
    })
    return response.ok(student.comments)

  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,params,response }: HttpContext) {

    const {content} = await request.validateUsing(commentValidator)
    const teacherId=1

    const comment = await Comment.create(
      {
        content,
        studentId:params.student_id,
        teacherId,
      }
    )
        return response.created(comment)
  }

  /**
   * Show individual record
   */
  async show({ params,response }: HttpContext) {

    const comment= await Comment.query()
    .where('id',params.id)
    .where('student_id',params.student_id)
    .preload('teacher')
    .firstOrFail()

    return response.ok(comment)
  }

  /**
   * Handle form submission for the edit action
   */
   async update({ params, request, response,bouncer }: HttpContext) {

    // Récupération des données envoyées par le client et validation des données
    const { content } = await request.validateUsing(commentValidator)

    // Vérifie que le commentaire appartient bien à l'élève
    const comment = await Comment.query()
      .where('id', params.id)
      .where('student_id', params.student_id)
      .firstOrFail()
    
      // Verfif des permission utilisateur
      if (await bouncer.with(CommentPolicy).denies('update',comment)){
        return response.forbidden({
          message:"You are not authorized"
        })
      }

    // Mise à jour
    comment.content = content
    await comment.save()
    // Réponse 200 OK avec le commentaire mis à jour
    return response.ok(comment)
  }

  /**
        * Supprimer le commentaire de l'élève student_id
      */
      async destroy({ params, response ,bouncer}: HttpContext) {
        const comment = await Comment.query()
          .where('id', params.id)
          .where('student_id', params.student_id)
          .firstOrFail()

    //Verif des droits
        if (await bouncer.with(CommentPolicy).denies('delete',comment)){
          return response.forbidden({
            message:"You have no right to delete this comment"
          })
        }
    // Suppression du commentaire
    await comment.delete()
    // On utilise `response.noContent` pour retourner un code HTTP 204 sans contenu
    return response.noContent()
    }
    }

