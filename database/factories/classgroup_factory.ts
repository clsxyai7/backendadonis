import factory from '@adonisjs/lucid/factories'
import Classgroup from '#models/class_group'

export const ClassgroupFactory = factory
  .define(Classgroup, async ({ faker }) => {
    return {
      name:faker.person.fullName()
    }
  })
  .build()