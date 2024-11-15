import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'
import { isProd } from '../../constants'

let updated: boolean = false
let passwordResetCode: string

const postForgotPassword = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { email, signupType } = JSON.parse(req.body)

    if (signupType === 'cbo') {
      const { cboObj } = initDb()
      passwordResetCode = uuid()

      const cbo = await cboObj.update(
        { passwordResetCode },
        { where: { email } },
      )
      if (cbo[0] !== 1) {
        res.status(200).json({ message: 'Email was sent to your inbox' })
      } else updated = true
    } else {
      const { clientObj } = initDb()
      passwordResetCode = `cli${uuid().slice(3)}`

      const client = await clientObj.update(
        { passwordResetCode },
        { where: { email } },
      )
      if (client[0] !== 1) {
        res.status(200).json({ message: 'Email was sent to your inbox' })
      } else updated = true
    }

    if (updated) {
      //@ts-ignore
      await sendEmail({
        to: email,
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
    res.status(500).json({ error: 'An error has occurred.' })
  }
}
export default postForgotPassword
