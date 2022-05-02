import axios from 'axios'

export function getRankInfo() {
  return axios.get('/api/rank')
}