import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers'
import initDb from '../../helpers/sequelize'
const postForgotPassword = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { adminObj } = initDb()
    const passwordResetCode = uuid()
    const user = await adminObj.update(
      { passwordResetCode: passwordResetCode },
      { where: { email: req.body } },
    )
    if (user[0] !== 1) {
      res.status(401).json({ message: 'error' })
      return
    }
    if (user) {
      //@ts-ignore
      await sendEmail({
        to: req.body,
        from: 'verification@thrivesbc.com',
        subject: 'Password Reset',
        text: `
          To reset your password, click this link:
          http://localhost:3000/forgotpassword/${passwordResetCode}
          `,
      })
      return res.status(200).json({ message: 'Email was sent to your inbox' })
    }
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: 'We did not find this email in our system' })
    return
  }
  res.status(200)
}
export default postForgotPassword
