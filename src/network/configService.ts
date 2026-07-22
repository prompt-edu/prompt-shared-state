import axios, { type AxiosInstance } from 'axios'
import { env } from '../env'
import { parseURL } from '../utils/parseURL'
import { logNetworkError } from './logNetworkError'

const logAndRethrow = (error: unknown): Promise<never> => {
  logNetworkError('Network request failed', error)
  return Promise.reject(error)
}

export interface Patch {
  op: 'replace' | 'add' | 'remove' | 'copy'
  path: string
  value: string
}

export const createAuthenticatedAxiosInstance = (baseHost: string): AxiosInstance => {
  const instance = axios.create()

  instance.interceptors.request.use((config) => {
    config.baseURL = parseURL(baseHost || '')

    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt_token')

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }

    return config
  })

  return instance
}

const authenticatedAxiosInstance = createAuthenticatedAxiosInstance(env.CORE_HOST)

authenticatedAxiosInstance.interceptors.response.use((response) => response, logAndRethrow)

const notAuthenticatedAxiosInstance = axios.create()

notAuthenticatedAxiosInstance.interceptors.request.use((config) => {
  config.baseURL = parseURL(env.CORE_HOST || '')
  return config
})

notAuthenticatedAxiosInstance.interceptors.response.use((response) => response, logAndRethrow)

export { authenticatedAxiosInstance as axiosInstance, notAuthenticatedAxiosInstance }
