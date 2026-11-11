import ClassGroup from '#models/class_group'
import { classgroupValidator } from '#validators/classgroup'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassgroupsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await ClassGroup.query()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request,respone }: HttpContext) {
    //douane
    const data = await request.validateUsing(classgroupValidator)
    //usine
    const cls = await ClassGroup.create(data)
    //produit
    return respone.created(cls)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await ClassGroup.findOrFail(params.id)
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