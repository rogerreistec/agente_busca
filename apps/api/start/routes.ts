import router from '@adonisjs/core/services/router'

import CategoriesController from '#controllers/categories_controller'
import UsersController from '#controllers/users_controller'
import AuthController from '#controllers/auth_controller'
import RequestsController from '#controllers/requests_controller'
import ProvidersController from '#controllers/providers_controller'
import ProposalsController from '#controllers/proposals_controller'

import { ok } from '#services/http_response'
import { middleware } from '#start/kernel'

router.get('/', async ({ response }) => {
  return ok(response, { message: 'Agente Busca API', data: { ok: true } })
})

// Categories
router.get('/categories', [CategoriesController, 'index'])
router.post('/categories', [CategoriesController, 'store'])

// Users
router.post('/users', [UsersController, 'store'])
router.get('/users', [UsersController, 'index'])
router.get('/users/:id', [UsersController, 'show'])

// Auth
router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/logout', [AuthController, 'logout']).use(middleware.auth())
router.get('/auth/me', [AuthController, 'me']).use(middleware.auth())

// Requests
router.post('/requests', [RequestsController, 'store']).use(middleware.auth())
router.get('/requests/my', [RequestsController, 'my']).use(middleware.auth())
router.get('/requests/:id', [RequestsController, 'show']).use(middleware.auth())
router.patch('/requests/:id/status', [RequestsController, 'updateStatus']).use(middleware.auth())

// ✅ Providers
router.post('/providers', [ProvidersController, 'store']).use(middleware.auth())
router.get('/providers/me', [ProvidersController, 'me']).use(middleware.auth())

// ✅ Proposals
router.post('/requests/:id/proposals', [ProposalsController, 'store']).use(middleware.auth())
router.get('/requests/:id/proposals', [ProposalsController, 'indexByRequest']).use(middleware.auth())
router.patch('/proposals/:id/status', [ProposalsController, 'updateStatus']).use(middleware.auth())
