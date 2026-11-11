import factory from '@adonisjs/lucid/factories'
import Classgroup from '#models/classgroup'

export const ClassgroupFactory = factory
  .define(Classgroup, async ({ faker }) => {
    return {
      name:faker.person.fullName()
    }
  })
  .build()