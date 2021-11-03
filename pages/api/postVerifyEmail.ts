import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

const postVerifyEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { cboObj } = initDb()
  const verificationString = JSON.parse(req.body)

  const cbo = await cboObj.update(
    { isVerified: true },
    { where: { verificationString: verificationString } },
  )

  const cboIsVerified: boolean = Boolean(cbo[0])

  try {
    if (!cboIsVerified) {
      return res
        .status(401)
        .json({ message: 'The email verification code is incorrect' })
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default postVerifyEmail
