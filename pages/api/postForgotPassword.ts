import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers'
import initDb from '../../helpers/sequelize'
import { isProd } from '../../constants'

const postForgotPassword = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { cboObj } = initDb()
    const passwordResetCode = uuid()
    const cbo = await cboObj.update(
      { passwordResetCode: passwordResetCode },
      { where: { email: req.body } },
    )
    if (cbo[0] !== 1) {
      res.status(401).json({ message: 'error' })
    }
    if (cbo) {
      //@ts-ignore
      await sendEmail({
        to: req.body,
        from: 'verification@thrivesbc.com',
        subject: 'Password Reset',
        text: `
          To reset your password, click this link:
          ${
            isProd ? 'https://www.thrivesbc.com' : 'http://localhost:3000'
          }/forgotpassword/${passwordResetCode}
          `,
      })
      res.status(200).json({ message: 'Email was sent to your inbox' })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: 'We did not find this email in our system' })
  }
}
export default postForgotPassword
