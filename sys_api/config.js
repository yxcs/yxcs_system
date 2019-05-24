let config =  {
  port: '8808',
  dbHost: '127.0.0.1:27017',
  dbName: 'sys',
  secret: 'DXkO5OulaS5E0VUM1Uypjs3eQayV38',    // jwt 秘钥
  url: {
    base: 'http://localhost:8808',
    download: 'http://localhost:8808',
    image: 'http://localhost:8808'
  },
  STATIC_URL: 'http://localhost:4001',
  API_URL: 'http://localhost:8808',
  BACK_URL: 'http://localhost:3000',
  FRONT_URL: 'http://localhost:8080'
}

if (process.env.NODE_ENV === 'production') {
  config = {
    port: '8808',
    dbHost: '127.0.0.1:27017',
    dbName: 'sys',
    secret: 'DXkO5OulaS5E0VUM1Uypjs3eQayV38',
    url: {
      base: 'http://106.13.141.26:8808',
      download: 'http://106.13.141.26:8808',
      image: 'http://106.13.141.26:8808'
    },
    STATIC_URL: 'http://106.13.141.26:4001',
    API_URL: 'http://106.13.141.26:8808',
    BACK_URL: 'http://106.13.141.26:3000',
    FRONT_URL: 'http://106.13.141.26:8080'
  }
}

export default config
