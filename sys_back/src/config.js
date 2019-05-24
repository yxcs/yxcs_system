let config = {
  apiHost: 'http://localhost:8808',
  static_url: 'http://localhost:4001',
  baseUrl: 'http://localhost:3000',
  secret: 'bradhcp95qc'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    apiHost: 'http://106.13.141.26:8808',
    static_url: 'http://106.13.141.26:4001',
    baseUrl: 'http://106.13.141.26:3000',
    secret: 'bradhcp95qc'
  }
}

export default config
