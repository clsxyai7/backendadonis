/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'


router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

    // Route de test
  router.get('test', async () => {
  return 'API is working!'
  })

  router.group(()=>{
  // Routes pour le CRUD /students
router.resource('students', controllers.Students).apiOnly()


 //   // Routes pour le CRUD /teachers
router.resource('teachers', controllers.Teachers).apiOnly()


 //   // Routes pour le CRUD /classgroup
router.resource('classgroups', controllers.Classgroups).apiOnly()

// Routes pour le crud Comment , apiOny 5 crud created
router.resource('students.comments',controllers.Comments).apiOnly()
})
.use(middleware.auth())

// Retourne la spécification OpenAPI au format YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Affiche l'interface interactive Swagger-UI à partir de /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})