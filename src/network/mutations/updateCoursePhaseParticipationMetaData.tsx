import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'
import { UpdateCoursePhaseParticipation } from '../../interfaces'

export const updateCoursePhaseParticipation = async (
  participation: UpdateCoursePhaseParticipation,
): Promise<string | undefined> => {
  try {
    return (
      await axiosInstance.put(
        `/api/course_phases/${participation.coursePhaseID}/participations/${participation.courseParticipationID}`,
        participation,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    ).data.id // try to get the id of the updated participation
  } catch (err) {
    logNetworkError('Error updating course phase participation metadata', err)
    throw err
  }
}
