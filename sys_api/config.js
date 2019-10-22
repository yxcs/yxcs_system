let config =  {
  port: '8808',
  dbHost: '106.13.141.26:27017',
  dbName: 'sys',
  dbUser: 'yxcs',
  dbPwd: 'p@ss_4d',
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
    dbHost: '106.13.141.26:27017',
    dbName: 'sys',
    dbUser: 'yxcs',
    dbPwd: 'p@ss_4d',
    secret: 'DXkO5OulaS5E0VUM1Uypjs3eQayV38',
    url: {
      base: 'http://api.oyxco.com',
      download: 'http://api.oyxco.com',
      image: 'http://api.oyxco.com'
    },
    STATIC_URL: 'http://static.oyxco.com',
    API_URL: 'http://api.oyxco.com',
    BACK_URL: 'http://manage.oyxco.com',
    FRONT_URL: 'http://blog.oyxco.com'
  }
}

export default config
