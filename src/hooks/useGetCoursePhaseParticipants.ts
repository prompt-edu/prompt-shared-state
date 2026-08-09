import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import type { CoursePhaseParticipationsWithResolution } from '../interfaces'
import { getCoursePhaseParticipations } from '../network/queries/getCoursePhaseParticipations'

export const useGetCoursePhaseParticipants = () => {
  const { phaseId } = useParams<{ phaseId: string }>()

  return useQuery<CoursePhaseParticipationsWithResolution>({
    queryKey: ['participants', phaseId],
    queryFn: () => getCoursePhaseParticipations(phaseId ?? ''),
    enabled: !!phaseId,
  })
}
