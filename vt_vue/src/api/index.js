import axios from 'axios'

export function getIndexInfo() {
  return axios.get('/api/index')
}