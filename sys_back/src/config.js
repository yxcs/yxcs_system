let config = {
  apiHost: 'http://localhsot:8808',
  static_url: 'http://localhsot:4001',
  baseUrl: 'http://localhsot:3000',
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
