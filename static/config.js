let config = {
  STATIC_URL: 'http://localhost:4001',
  API_URL: 'http://localhost:8808',
  BACK_URL: 'http://localhost:3000',
  FRONT_URL: 'http://localhost:8080'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    STATIC_URL: 'http://106.13.141.26:4001',
    API_URL: 'http://106.13.141.26:8808',
    BACK_URL: 'http://106.13.141.26:3000',
    FRONT_URL: 'http://106.13.141.26:8080'
  }
}

module.exports = config