type Environment = 'development' | 'staging' | 'production'

type EnvType = {
  ENVIRONMENT: Environment
  CORE_HOST: string
  INTRO_COURSE_HOST: string
  TEAM_ALLOCATION_HOST: string
  ASSESSMENT_HOST: string
  DEVOPS_CHALLENGE_HOST: string
  INTERVIEW_HOST: string
  KEYCLOAK_HOST: string
  KEYCLOAK_REALM_NAME: string
  CHAIR_NAME_LONG: string
  CHAIR_NAME_SHORT: string
  GITHUB_SHA: string
  GITHUB_REF: string
  SERVER_IMAGE_TAG: string
  SELF_TEAM_ALLOCATION_HOST: string
  TEMPLATE_HOST: string
  CERTIFICATE_HOST: string
  SENTRY_DSN_CLIENT: string
}

declare global {
  interface Window {
    env: Partial<EnvType>
  }
}

const validEnvironments: Environment[] = ['development', 'staging', 'production']

const requiredKeys: (keyof EnvType)[] = [
  'CORE_HOST',
  'INTRO_COURSE_HOST',
  'TEAM_ALLOCATION_HOST',
  'ASSESSMENT_HOST',
  'DEVOPS_CHALLENGE_HOST',
  'INTERVIEW_HOST',
  'KEYCLOAK_HOST',
  'KEYCLOAK_REALM_NAME',
  'CHAIR_NAME_LONG',
  'CHAIR_NAME_SHORT',
  'GITHUB_SHA',
  'GITHUB_REF',
  'SERVER_IMAGE_TAG',
  'SELF_TEAM_ALLOCATION_HOST',
  'TEMPLATE_HOST',
  'CERTIFICATE_HOST',
  'SENTRY_DSN_CLIENT'
]

function isEnvironment(value: unknown): value is Environment {
  return typeof value === 'string' && validEnvironments.includes(value as Environment)
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function normalizeEnv(rawEnv: Partial<EnvType>): EnvType {
  const environment: Environment = isEnvironment(rawEnv.ENVIRONMENT) ? rawEnv.ENVIRONMENT : 'development'

  const invalidKeys: string[] = []

  if (!isEnvironment(rawEnv.ENVIRONMENT)) {
    invalidKeys.push('ENVIRONMENT')
  }

  const normalized: EnvType = {
    ENVIRONMENT: environment,
    CORE_HOST: normalizeString(rawEnv.CORE_HOST),
    INTRO_COURSE_HOST: normalizeString(rawEnv.INTRO_COURSE_HOST),
    TEAM_ALLOCATION_HOST: normalizeString(rawEnv.TEAM_ALLOCATION_HOST),
    ASSESSMENT_HOST: normalizeString(rawEnv.ASSESSMENT_HOST),
    DEVOPS_CHALLENGE_HOST: normalizeString(rawEnv.DEVOPS_CHALLENGE_HOST),
    INTERVIEW_HOST: normalizeString(rawEnv.INTERVIEW_HOST),
    KEYCLOAK_HOST: normalizeString(rawEnv.KEYCLOAK_HOST),
    KEYCLOAK_REALM_NAME: normalizeString(rawEnv.KEYCLOAK_REALM_NAME),
    CHAIR_NAME_LONG: normalizeString(rawEnv.CHAIR_NAME_LONG),
    CHAIR_NAME_SHORT: normalizeString(rawEnv.CHAIR_NAME_SHORT),
    GITHUB_SHA: normalizeString(rawEnv.GITHUB_SHA),
    GITHUB_REF: normalizeString(rawEnv.GITHUB_REF),
    SERVER_IMAGE_TAG: normalizeString(rawEnv.SERVER_IMAGE_TAG),
    SELF_TEAM_ALLOCATION_HOST: normalizeString(rawEnv.SELF_TEAM_ALLOCATION_HOST),
    TEMPLATE_HOST: normalizeString(rawEnv.TEMPLATE_HOST),
    CERTIFICATE_HOST: normalizeString(rawEnv.CERTIFICATE_HOST),
    SENTRY_DSN_CLIENT: normalizeString(rawEnv.SENTRY_DSN_CLIENT)
  }

  for (const key of requiredKeys) {
    if (!normalized[key]) {
      invalidKeys.push(key)
    }
  }

  if (invalidKeys.length > 0) {
    const message = `[prompt-shared-state] Missing or invalid env keys: ${invalidKeys.join(', ')}`

    if (environment === 'production') {
      throw new Error(message)
    }

    console.warn(message)
  }

  return normalized
}

const rawEnv: Partial<EnvType> = typeof window !== 'undefined' ? (window.env ?? {}) : {}

export const env: EnvType = normalizeEnv(rawEnv)
