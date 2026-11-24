
import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { commentValidator } from '#validators/comment'
import Comment from '#models/comment'

export default class TeachersController {
  /**
   Read (Lire) : Afficher la liste complète (index)
   */
  async index({}: HttpContext) {
    return await Teacher.query()
  }

    /**
 * Ajouter un nouveau commentaire à l'élève student_id
 */
async store({ params, request, response, auth }: HttpContext) {
  // Récupération des données envoyées par le client et validation des données
  const { content } = await request.validateUsing(commentValidator)

  // Récupération de l'utilisateur authentifié
  const user = auth.getUserOrFail()

  // Chargement de l'enseignant lié à cet utilisateur
  const teacher = await user.related('teacher').query().first()
  if (!teacher) {
    return response.badRequest({ message: 'Teacher not found' })
  }

  // Création du commentaire lié à l'élève
  const comment = await Comment.create({
    content,
    studentId: params.student_id,
    teacherId: teacher.id,
  })

  // Réponse HTTP 201 avec le commentaire
  return response.created(comment)
}



  /**
   Read (Lire) : Afficher un dossier précis (show)
   */
  async show({ params }: HttpContext) {

    return await Teacher.findByOrFail(params.id) // pq pas de await ici ??

  }

  /**
   Update (Mettre à jour) : Modifier un dossier existant (update)
   */
  async update({ params, request , response }: HttpContext) {
   
    // check si l'élève existe sur la db
    const teacher = await Teacher.findByOrFail(params.id)
    // ??
    const data = await request.validateUsing(teacherValidator)
    // merge , save
    await teacher.merge(data).save()
    //
    return response.ok(teacher)

  }

  /**
   Delete (Supprimer) : Détruire un dossier (destroy)
   */
  async destroy({ params,response }: HttpContext) {
    (await Teacher.findOrFail(params.id)).delete()
    return response.noContent()

    
  }
}