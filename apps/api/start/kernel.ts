// start/kernel.ts
import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * Error handler
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * Global server middleware
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * Router middleware (bodyparser)
 */
router.use([() => import('@adonisjs/core/bodyparser_middleware')])

/**
 * ✅ Named middleware (EXPORTADO)
 * Use no routes como: .use(middleware.auth())
 */
export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware'),
})
