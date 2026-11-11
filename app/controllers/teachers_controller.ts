
import Teacher from '#models/teacher'
import { teacherValidator } from '#validators/teacher'
import type { HttpContext } from '@adonisjs/core/http'

export default class TeachersController {
  /**
   Read (Lire) : Afficher la liste complète (index)
   */
  async index({}: HttpContext) {
    return await Teacher.query()
  }

  /**
   Create (Créer) : Ajouter un nouveau dossier (store)
   */
  async store({ request,response }: HttpContext) {
    // douane
    const {name,firstname,email} = await request.validateUsing(teacherValidator)
    // usine
    const teacher = await Teacher.create({name,firstname,email})
    // produit
    return response.created(teacher)
    
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