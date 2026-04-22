import { axiosInstance } from '../configService'
import { CoursePhaseParticipationWithStudent } from '../../interfaces'

export const getOwnCoursePhaseParticipation = async (
  coursePhaseID: string,
): Promise<CoursePhaseParticipationWithStudent> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}/participations/self`)).data
  } catch (err) {
    console.error(err)
    throw err
  }
}
