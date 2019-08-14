export const apiUrl = 
  process.env.NODE_ENV === 'production' 
  ? 'http://api.oyxco.com' 
  : 'http://localhost:8808'
export const version = 'v1'
export const secret = 'bradhcp95qc'
export const static_url =  process.env.NODE_ENV === 'production' ? 'http:/static.oyxco.com' : 'http://localhost:4001'