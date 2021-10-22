import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

import jwt from 'jsonwebtoken'

const postVerifyEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { adminObj } = initDb()

  const user = await adminObj.update(
    { isVerified: true },
    { where: { verificationString: req.body } },
  )

  try {
    if (!user) {
      return res
        .status(401)
        .json({ message: 'The email verification code is incorrect' })
    }
    //@ts-ignore
    const { id, email } = user

    jwt.sign(
      { id, email, isVerified: true },
      process.env.JWT_SECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) return res.status(500)
        res.status(200).json({ token })
      },
    )
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default postVerifyEmail
