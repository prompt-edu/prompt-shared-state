import { axiosInstance } from '../configService'
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
          'Content-Type': 'application/json-path+json',
        },
      },
    )
  } catch (err) {
    console.error(err)
    throw err
  }
}
