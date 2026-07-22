import type { CoursePhaseParticipationsWithResolution } from '../../interfaces'
import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'

export const getCoursePhaseParticipations = async (
  coursePhaseID: string,
): Promise<CoursePhaseParticipationsWithResolution> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}/participations`)).data
  } catch (err) {
    logNetworkError('Error fetching course phase participations', err)
    throw err
  }
}
