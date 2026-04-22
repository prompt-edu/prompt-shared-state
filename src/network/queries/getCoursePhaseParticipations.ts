import { axiosInstance } from '../configService'
import { CoursePhaseParticipationsWithResolution } from '../../interfaces'

export const getCoursePhaseParticipations = async (
  coursePhaseID: string,
): Promise<CoursePhaseParticipationsWithResolution> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}/participations`)).data
  } catch (err) {
    console.error(err)
    throw err
  }
}
