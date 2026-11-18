import ClassGroup from '#models/class_group'
import { classgroupValidator } from '#validators/classgroup'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassgroupsController {
  /**
   * Display a list of resource
   */
  // async index({}: HttpContext) {
  //   return await ClassGroup.query().preload('teacher').orderBy('name','asc')
  // }

  async index({ response }: HttpContext) {
    const classGroups = await ClassGroup.query().preload('teacher').orderBy('name', 'asc')
    return response.ok(classGroups)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,response }: HttpContext) {
    //douane
    // const {name,teacherId} = await request.validateUsing(classgroupValidator)
    // //usine
    // const cls = await ClassGroup.create({name,teacherId})

    const data = await request.validateUsing(classgroupValidator)
    const cls = await ClassGroup.create(data) // Injecte tout le contenu de data d'un coup !



    //produit
    return response.created(cls)
  }

  /**
   * Show individual record
   */
  async show({ params , response }: HttpContext) {
    const classGroup = await ClassGroup.query().preload('teacher').where('id', params.id).firstOrFail()
    return response.ok(classGroup)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request , response }: HttpContext) {
    // check si ça existe
    const cls = await ClassGroup.findOrFail(params.id)
    // 
    const data = await request.validateUsing(classgroupValidator)
    //merge,save
    await cls.merge(data).save()
    // retour

    await cls.load('teacher')

    return response.ok(cls)
  }

  /**
   * Delete record
   */
  async destroy({ params,response }: HttpContext) {
     const cls =await ClassGroup.findOrFail(params.id)
     await cls.delete()// On attend bien que la base supprime l'enregistremen
    
    return response.noContent()
  }
}