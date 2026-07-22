import type { CoursePhaseWithMetaData } from '../../interfaces'
import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'

export const getCoursePhase = async (coursePhaseID: string): Promise<CoursePhaseWithMetaData> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}`)).data
  } catch (err) {
    logNetworkError('Error fetching course phase', err)
    throw err
  }
}
