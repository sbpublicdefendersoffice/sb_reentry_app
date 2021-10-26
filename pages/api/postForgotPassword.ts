import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers'
import initDb from '../../helpers/sequelize'

const postForgotPassword = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { adminObj } = initDb()

  try {
    const passwordResetCode = uuid()
    const user = await adminObj.update(
      { passwordResetCode: passwordResetCode },
      { where: { email: req.body } },
    )
    if (user) {
      try {
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
      } catch (err) {
        const error: string = err.message
        console.error(error)
        res.json({ error })
      }
    }
  } catch (err) {
    console.error(err)
    res.status(500)
  }
  res.status(200)
}
export default postForgotPassword
