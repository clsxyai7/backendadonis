import Student from '#models/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext)
   {
    const students = await Student.query().orderBy('name').orderBy('firstname')
    console.log(students.length)
    return students
}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {

    const student = request.only(['name','firstname'])
    return Student.create(student)
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
async update({ params, request }: HttpContext) {
// Récupération des données
const data = request.only(['name', 'firstname'])
// Vérification de l'existence de l'élève
const student = await Student.findOrFail(params.id)
// Mise à jour des données de l'élève
student.merge(data)
// Sauvegarde des modifications
await student.save()
// Retour le json de l'élève mis à jour
return student
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