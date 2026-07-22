import type { CoursePhaseParticipationWithStudent } from '../../interfaces'
import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'

export const getOwnCoursePhaseParticipation = async (
  coursePhaseID: string,
): Promise<CoursePhaseParticipationWithStudent> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}/participations/self`)).data
  } catch (err) {
    logNetworkError('Error fetching own course phase participation', err)
    throw err
  }
}
