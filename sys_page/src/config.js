export const apiUrl = 
  process.env.NODE_ENV === 'production' 
  ? 'http://106.13.141.26:8808' 
  : 'http://localhost:8808'
export const version = 'v1'
export const secret = 'bradhcp95qc'
export const static_url =  process.env.NODE_ENV === 'production' ? 'http://106.13.141.26:4001' : 'http://localhost:4001'