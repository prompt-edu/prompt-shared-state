import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { updateCoursePhase } from '../network/mutations/updateCoursePhase'
import { UpdateCoursePhase, CoursePhaseWithMetaData } from '../interfaces'

interface MutationContext {
  previousCoursePhase?: CoursePhaseWithMetaData
}

export const useUpdateCoursePhaseMetaData = (): UseMutationResult<
  string | undefined,
  Error,
  UpdateCoursePhase,
  MutationContext
> => {
  const { phaseId } = useParams<{ phaseId: string }>()
  const queryClient = useQueryClient()

  const mutation = useMutation<string | undefined, Error, UpdateCoursePhase, MutationContext>({
    mutationFn: (coursePhase: UpdateCoursePhase) => {
      return updateCoursePhase(coursePhase)
    },
    // Optimistically update cache before server responds
    onMutate: async (newCoursePhaseData) => {
      // Cancel any outgoing refetches to prevent overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['course_phase', phaseId] })

      // Snapshot the previous value for rollback
      const previousCoursePhase = queryClient.getQueryData<CoursePhaseWithMetaData>([
        'course_phase',
        phaseId,
      ])

      // Optimistically update cache with new data
      if (previousCoursePhase) {
        queryClient.setQueryData<CoursePhaseWithMetaData>(['course_phase', phaseId], {
          ...previousCoursePhase,
          restrictedData: {
            ...previousCoursePhase.restrictedData,
            ...newCoursePhaseData.restrictedData,
          },
        })
      }

      return { previousCoursePhase }
    },
    onSuccess: () => {
      // Refetch to ensure data is in sync with server
      queryClient.invalidateQueries({ queryKey: ['course_phase', phaseId] })
      // Cross-invalidate participants cache as they need updated questions
      queryClient.invalidateQueries({ queryKey: ['participants', phaseId] })
    },
    onError: (error, _newCoursePhase, context) => {
      // Rollback on error
      if (context?.previousCoursePhase) {
        queryClient.setQueryData(['course_phase', phaseId], context.previousCoursePhase)
      }
    },
  })

  return mutation
}
