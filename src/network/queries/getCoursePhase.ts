import { axiosInstance } from '../configService'
import { CoursePhaseWithMetaData } from '../../interfaces'

export const getCoursePhase = async (coursePhaseID: string): Promise<CoursePhaseWithMetaData> => {
  try {
    return (await axiosInstance.get(`/api/course_phases/${coursePhaseID}`)).data
  } catch (err) {
    console.error(err)
    throw err
  }
}
