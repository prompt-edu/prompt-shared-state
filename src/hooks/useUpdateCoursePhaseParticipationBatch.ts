import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { UpdateCoursePhaseParticipation } from '../interfaces'
import { updateCoursePhaseParticipationBatch } from '../network/mutations/updateCoursePhaseParticipationBatch'

export const useUpdateCoursePhaseParticipationBatch = (): UseMutationResult<
  void,
  Error,
  UpdateCoursePhaseParticipation[],
  unknown
> => {
  const { phaseId } = useParams<{ phaseId: string }>()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (coursePhaseParticipations: UpdateCoursePhaseParticipation[]) => {
      return updateCoursePhaseParticipationBatch(phaseId ?? '', coursePhaseParticipations)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['participants', phaseId] })
    },
  })

  return mutation
}
