import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { CookieScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": {
    "login": "/auth/login",
    "logout": "/",
    "home": "/",
    "callback": "/login"
  },
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "cookie"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // cookie
  $auth.registerStrategy('cookie', new CookieScheme($auth, {
  "cookie": {
    "name": "X-XSRF-TOKEN"
  },
  "name": "cookie"
}))

  // laravelSanctum
  $auth.registerStrategy('laravelSanctum', new CookieScheme($auth, {
  // "url": "http://localhost:8000",
  "url": "https://demo-izakaya-backend.herokuapp.com",
  "endpoints": {
    "csrf": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // "url": "http://localhost:8000/sanctum/csrf-cookie"
      "url": "https://demo-izakaya-backend.herokuapp.com/sanctum/csrf-cookie"
    },
    "login": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // "url": "http://localhost:8000/api/login"
      "url": "https://demo-izakaya-backend.herokuapp.com/api/login"
    },
    "logout": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // "url": "http://localhost:8000/api/logout"
      "url": "https://demo-izakaya-backend.herokuapp.com/api/logout"
    },
    "user": {
      "withCredentials": true,
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      // "url": "http://localhost:8000/api/user"
      "url": "https://demo-izakaya-backend.herokuapp.com/api/user"
    }
  },
  "user": {
    "property": false
  },
  "name": "laravelSanctum",
  "cookie": {
    "name": "XSRF-TOKEN"
  }
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
