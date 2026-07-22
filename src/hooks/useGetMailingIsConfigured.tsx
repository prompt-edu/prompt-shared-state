import { useParams } from 'react-router-dom'
import { useCourseStore } from '../zustand'

export const useGetMailingIsConfigured = (): boolean => {
  const { courseId } = useParams<{ courseId: string }>()
  const { courses } = useCourseStore()
  const activeCourse = courses.find((course) => course.id === courseId)

  const mailingSettings = activeCourse?.restrictedData?.mailingSettings

  if (
    mailingSettings !== undefined &&
    typeof mailingSettings.replyToEmail === 'string' &&
    mailingSettings.replyToEmail.trim() !== '' &&
    typeof mailingSettings.replyToName === 'string' &&
    mailingSettings.replyToName.trim() !== ''
  ) {
    return true
  } else {
    return false
  }
}
