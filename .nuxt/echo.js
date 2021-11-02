import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

function getHeaders ({ app }) {
  const headers = {}

  return headers
}

export default (ctx, inject) => {
  const options = {"broadcaster":"pusher","plugins":null,"authModule":false,"connectOnLogin":true,"disconnectOnLogout":true,"key":"9b9a2c2a774c86bec098","cluster":"ap3","forceTLS":true}
  options.auth = options.auth || {}
  options.auth.headers = {
    ...options.auth.headers,
    ...getHeaders(ctx)
  }

  const echo = new Echo(options)

  ctx.$echo = echo
  inject('echo', echo)
}
