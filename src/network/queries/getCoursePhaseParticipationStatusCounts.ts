import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'

export interface CoursePhaseParticipationStatusCounts {
  [key: string]: number
}

export const getCoursePhaseParticipationStatusCounts = async (
  phaseId: string,
): Promise<CoursePhaseParticipationStatusCounts> => {
  try {
    const data: CoursePhaseParticipationStatusCounts = (
      await axiosInstance.get(`/api/course_phases/${phaseId}/participation_status_counts`)
    ).data
    return data
  } catch (err) {
    logNetworkError('Error fetching course phase participation status counts', err)
    throw err
  }
}
