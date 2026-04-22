export const parseURL = (envURL: string): string => {
  if (envURL === '') {
    if (typeof window !== 'undefined') {
      return window.location.origin // defaults to location
    }

    return ''
  } else if (envURL.startsWith('http')) {
    return envURL // absolute URL
  } else {
    return `https://${envURL}` // relative URL
  }
}
