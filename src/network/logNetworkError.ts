import axios from 'axios'

interface SanitizedErrorDetails {
  status?: number
  message: string
}

const getSanitizedErrorDetails = (err: unknown): SanitizedErrorDetails => {
  if (axios.isAxiosError(err)) {
    return {
      status: err.response?.status,
      message: err.message,
    }
  }

  if (err instanceof Error) {
    return {
      message: err.message,
    }
  }

  return {
    message: 'Unknown error',
  }
}

export const logNetworkError = (message: string, err: unknown): void => {
  console.error(message, getSanitizedErrorDetails(err))
}
