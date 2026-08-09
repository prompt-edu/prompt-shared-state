import type { Person } from '../person/person'
import type { Gender } from './gender'
import type { StudyDegree } from './studyDegree'

export interface Student extends Person {
  email: string
  matriculationNumber?: string
  universityLogin?: string
  hasUniversityAccount: boolean
  gender?: Gender
  nationality?: string
  studyDegree?: StudyDegree
  currentSemester?: number
  studyProgram?: string
}
