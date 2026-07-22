import type React from 'react'
import { createContext, useContext } from 'react'
import { useGetCoursePhase } from '../hooks/useGetCoursePhase'
import { useGetCoursePhaseParticipants } from '../hooks/useGetCoursePhaseParticipants'
import type {
  CoursePhaseParticipationsWithResolution,
  CoursePhaseWithMetaData,
} from '../interfaces'

interface CoursePhaseContextValue {
  coursePhase: CoursePhaseWithMetaData | undefined
  participations: CoursePhaseParticipationsWithResolution | undefined
  isPending: boolean
  isError: boolean
  refetch: () => void
}

const CoursePhaseContext = createContext<CoursePhaseContextValue | undefined>(undefined)

export const CoursePhaseProvider = ({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element => {
  const coursePhaseQuery = useGetCoursePhase()
  const participationsQuery = useGetCoursePhaseParticipants()

  const value: CoursePhaseContextValue = {
    coursePhase: coursePhaseQuery.data,
    participations: participationsQuery.data,
    isPending: coursePhaseQuery.isPending || participationsQuery.isPending,
    isError: coursePhaseQuery.isError || participationsQuery.isError,
    refetch: () => {
      coursePhaseQuery.refetch()
      participationsQuery.refetch()
    },
  }

  return <CoursePhaseContext.Provider value={value}>{children}</CoursePhaseContext.Provider>
}

export const useCoursePhaseContext = (): CoursePhaseContextValue => {
  const context = useContext(CoursePhaseContext)

  if (!context) {
    throw new Error('useCoursePhaseContext must be used within a CoursePhaseProvider')
  }

  return context
}
