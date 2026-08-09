import type { CoursePhaseParticipationWithStudent } from './coursePhaseParticipationWithStudent'
import type { DataResolution } from './resolution'

export interface CoursePhaseParticipationsWithResolution {
  participations: CoursePhaseParticipationWithStudent[]
  resolutions: DataResolution[]
}
