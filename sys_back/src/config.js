let config = {
  apiHost: 'http://localhost:8808',
  static_url: 'http://localhost:4001',
  baseUrl: 'http://localhost:3000',
  secret: 'bradhcp95qc'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    apiHost: 'http://api.oyxco.com',
    static_url: 'http://static.oyxco.com',
    baseUrl: 'http://manage.oyxco.com',
    secret: 'bradhcp95qc'
  }
}

export default config
