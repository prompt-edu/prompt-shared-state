export interface ExportedApplicationAnswer {
  /** Id of the application question. Absent in answers from a core version that does not export it yet. */
  questionID?: string
  /** Title of the application question, for display. Absent where `questionID` is. */
  title?: string
  /**
   * Free-text access key the lecturer typed for the question.
   * @deprecated Reference the question by `questionID` and show `title`. Core stops exporting the key once every phase uses the id.
   */
  key?: string
  answer: string
  type: 'text' | 'multiselect'
  orderNum: number
}
