export const apiUrl = 
  process.env.NODE_ENV === 'production' 
  ? 'http://106.13.141.26:8808' 
  : 'http://localhsot:8808'
export const version = 'v1'