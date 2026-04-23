import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'
import { CoursePhaseWithMetaData } from '../../interfaces'

export const getCoursePhase = async (coursePhaseID: string): Promise<CoursePhaseWithMetaData> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}`)).data
  } catch (err) {
    logNetworkError('Error fetching course phase', err)
    throw err
  }
}
