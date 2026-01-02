import router from '@adonisjs/core/services/router'
import CategoriesController from '#controllers/categories_controller'
import UsersController from '#controllers/users_controller'

router.get('/', async () => {
  return { ok: true, app: 'Agente Busca API' }
})

// Categories
router.get('/categories', [CategoriesController, 'index'])
router.post('/categories', [CategoriesController, 'store'])

// Users
router.get('/users', [UsersController, 'index'])
router.get('/users/:id', [UsersController, 'show'])
