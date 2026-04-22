import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'
import { UpdateCoursePhaseParticipation } from '../../interfaces'

export const updateCoursePhaseParticipationBatch = async (
  coursePhaseID: string,
  updateParticipations: UpdateCoursePhaseParticipation[],
): Promise<void> => {
  try {
    await axiosInstance.put(
      `/api/course_phases/${coursePhaseID}/participations`,
      updateParticipations,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (err) {
    logNetworkError('Error updating course phase participation batch', err)
    throw err
  }
}
