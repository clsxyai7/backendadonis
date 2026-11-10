import Student from '#models/student'
import { studentValidator } from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext)
   {
    // const students = await Student.query().orderBy('name').orderBy('firstname')
    // console.log(students.length)
    // return students

    return await Student.query().orderBy('name').orderBy('firstname')
}

  /**
   * Handle form submission for the create action
   */

  // Ajouter un élève

  async store({ request,response }: HttpContext) {

    // Récupération des données envoyées par le client et validation des données
    const {name,firstname} = await request.validateUsing(studentValidator)
    // Création d'un nouvel élève avec les données validées
    const student = await Student.create({name,firstname})
    // On utilise `response.created` pour retourner un code HTTP 201 avec les données de l'élève crée
    return response.created(student)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return Student.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  /**
* Mettre à jour un élève
*
* Cette méthode est utilisée pour mettre à jour les informations d'un élève que ce soit :
* - pour une modification complète (PUT)
* - ou une modification partielle (PATCH)
*/
async update({ params, request , response }: HttpContext) {
// Récupération des données
const data = await request.validateUsing(studentValidator)
// Vérification de l'existence de l'élève
const student = await Student.findOrFail(params.id)
// Mise à jour des données de l'élève + sauvegarde : Asynchrone quality of JS
await student.merge(data).save()
// Retour le json de l'élève mis à jour
return response.ok(student)
}

  /**
   * Delete record
   */
  /**
* Supprimer un élève
*/
async destroy({ params }: HttpContext) {
const student = await Student.findOrFail(params.id)
return student.delete()
}
}