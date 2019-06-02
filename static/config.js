let config = {
  STATIC_URL: 'http://localhost:4001',
  API_URL: 'http://localhost:8808',
  BACK_URL: 'http://localhost:3000',
  FRONT_URL: 'http://localhost:8080',
  accessKey: 'yIQ28eI8gWaAvubxsq0wMOeR6FoTtt2rnSUiy3PS',
  secretKey: '70ywdZYqvyJfLUuT10voR9hFqhi6MiEZyqO1SyOy'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    STATIC_URL: 'http://static.oyxco.com',
    API_URL: 'http://api.oyxco.com',
    BACK_URL: 'http://manage.oyxco.com',
    FRONT_URL: 'http://blog.oyxco.com',
    accessKey: 'yIQ28eI8gWaAvubxsq0wMOeR6FoTtt2rnSUiy3PS',
    secretKey: '70ywdZYqvyJfLUuT10voR9hFqhi6MiEZyqO1SyOy'
  }
}

module.exports = config