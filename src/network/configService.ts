// TODO rewrite this as context provider and re-integrate it into the shared library

import axios from 'axios'
import { env } from '../env'
import { parseURL } from '../utils/parseURL'

const getServerBaseUrl = (): string => parseURL(env.CORE_HOST || '')

export interface Patch {
  op: 'replace' | 'add' | 'remove' | 'copy'
  path: string
  value: string
}

const authenticatedAxiosInstance = axios.create()

authenticatedAxiosInstance.interceptors.request.use((config) => {
  config.baseURL = getServerBaseUrl()

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('jwt_token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }

  return config
})

const notAuthenticatedAxiosInstance = axios.create()

notAuthenticatedAxiosInstance.interceptors.request.use((config) => {
  config.baseURL = getServerBaseUrl()
  return config
})

export { authenticatedAxiosInstance as axiosInstance, notAuthenticatedAxiosInstance }
