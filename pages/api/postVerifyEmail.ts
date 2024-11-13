import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

const postVerifyEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const verificationString: string = JSON.parse(req.body)

    if (verificationString.startsWith('cli')) {
      const { clientObj } = initDb()

      const client = await clientObj.update(
        { isVerified: true },
        { where: { verificationString } },
      )

      const clientIsVerified: boolean = Boolean(client[0])

      if (!clientIsVerified)
        throw new Error('The email verification code is incorrect')
      else res.json({ ...client })
    } else {
      const { cboObj } = initDb()
      const cbo = await cboObj.update(
        { isVerified: true },
        { where: { verificationString } },
      )

      const cboIsVerified: boolean = Boolean(cbo[0])

      if (!cboIsVerified)
        throw new Error('The email verification code is incorrect')
      else res.json({ ...cbo })
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'Unable to verify email.' })
  }
}

export default postVerifyEmail
