import type { MailingReport, SendStatusMail } from '../../interfaces'
import { axiosInstance } from '../configService'
import { logNetworkError } from '../logNetworkError'

export const sendStatusMail = async (
  coursePhaseID: string,
  status: SendStatusMail,
): Promise<MailingReport> => {
  try {
    return (
      await axiosInstance.put(`/api/mailing/${coursePhaseID}`, status, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data
  } catch (err) {
    logNetworkError('Error sending status mail', err)
    throw err
  }
}
