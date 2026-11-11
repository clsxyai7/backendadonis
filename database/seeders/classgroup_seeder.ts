import { ClassgroupFactory } from '#database/factories/classgroup_factory';
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
   await ClassgroupFactory.createMany(10)
  }
}