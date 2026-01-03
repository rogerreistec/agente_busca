import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/categories_controller'
import UsersController from '#controllers/users_controller'
import { ok } from '#services/http_response'

router.get('/', async ({ response }) => {
  return ok(response, { message: 'Agente Busca API', data: { ok: true } })
})

// Categories
router.get('/categories', [CategoriesController, 'index'])
router.post('/categories', [CategoriesController, 'store'])

// Users
router.get('/users', [UsersController, 'index'])
router.get('/users/:id', [UsersController, 'show'])
router.post('/users', [UsersController, 'store'])