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
  'SENTRY_DSN_CLIENT',
]

function isEnvironment(value: unknown): value is Environment {
  return typeof value === 'string' && validEnvironments.includes(value as Environment)
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function normalizeEnv(envInput: Partial<EnvType>): EnvType {
  const environment: Environment = isEnvironment(envInput.ENVIRONMENT)
    ? envInput.ENVIRONMENT
    : 'development'

  const invalidKeys: string[] = []

  if (!isEnvironment(envInput.ENVIRONMENT)) {
    invalidKeys.push('ENVIRONMENT')
  }

  const normalized: EnvType = {
    ENVIRONMENT: environment,
    CORE_HOST: normalizeString(envInput.CORE_HOST),
    INTRO_COURSE_HOST: normalizeString(envInput.INTRO_COURSE_HOST),
    TEAM_ALLOCATION_HOST: normalizeString(envInput.TEAM_ALLOCATION_HOST),
    ASSESSMENT_HOST: normalizeString(envInput.ASSESSMENT_HOST),
    DEVOPS_CHALLENGE_HOST: normalizeString(envInput.DEVOPS_CHALLENGE_HOST),
    INTERVIEW_HOST: normalizeString(envInput.INTERVIEW_HOST),
    KEYCLOAK_HOST: normalizeString(envInput.KEYCLOAK_HOST),
    KEYCLOAK_REALM_NAME: normalizeString(envInput.KEYCLOAK_REALM_NAME),
    CHAIR_NAME_LONG: normalizeString(envInput.CHAIR_NAME_LONG),
    CHAIR_NAME_SHORT: normalizeString(envInput.CHAIR_NAME_SHORT),
    GITHUB_SHA: normalizeString(envInput.GITHUB_SHA),
    GITHUB_REF: normalizeString(envInput.GITHUB_REF),
    SERVER_IMAGE_TAG: normalizeString(envInput.SERVER_IMAGE_TAG),
    SELF_TEAM_ALLOCATION_HOST: normalizeString(envInput.SELF_TEAM_ALLOCATION_HOST),
    TEMPLATE_HOST: normalizeString(envInput.TEMPLATE_HOST),
    CERTIFICATE_HOST: normalizeString(envInput.CERTIFICATE_HOST),
    SENTRY_DSN_CLIENT: normalizeString(envInput.SENTRY_DSN_CLIENT),
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
