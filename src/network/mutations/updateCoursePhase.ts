import type { UpdateCoursePhase } from '../../interfaces'
import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'

export const updateCoursePhase = async (
  coursePhase: UpdateCoursePhase,
): Promise<string | undefined> => {
  try {
    return (
      await axiosInstance.put(`/api/course_phases/${coursePhase.id}`, coursePhase, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data.id // try to get the id of the created course
  } catch (err) {
    logNetworkError('Error updating course phase', err)
    throw err
  }
}
