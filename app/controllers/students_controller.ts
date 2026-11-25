
import Student from '#models/student'
import { getStudentsQueryValidator,studentValidator } from '#validators/student'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentsController {
  /**
   * Display a list of resource
   */
 async index({ response, request }: HttpContext) {
  // 1. Validation + valeurs par défaut
  const {
    page = 1,
    limit = 10,
    sort = 'name',
    order = 'asc',
    classGroupId,
    search,
  } = await request.validateUsing(getStudentsQueryValidator)

  // 2. Préparation de la requête (SANS await)
  const query = Student.query().preload('class_group').preload('comments')

  // 3. Filtres optionnels
  if (classGroupId) {
    query.where('class_group_id', classGroupId)
  }

  if (search) {
    query.where((subQuery) => {
      subQuery.whereILike('name', `%${search}%`).orWhereILike('firstname', `%${search}%`)
    })
  }

  // 4. Tri et exécution finale (AVEC await)
  query.orderBy(sort, order)
  const students = await query.paginate(page, limit)

  // 5. Construction des liens dans "meta" et réponse
  students.baseUrl('/students')
  students.queryString({ page, limit, sort, order, classGroupId, search })

  return response.ok(students)
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
  async show({ params,response }: HttpContext) {
    const rep = await Student.query().preload('class_group').where('id',params.id).firstOrFail()
    return response.ok(rep)
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
await student.load('class_group')

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