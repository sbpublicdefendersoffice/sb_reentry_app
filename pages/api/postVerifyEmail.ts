import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

import jwt from 'jsonwebtoken'

const postVerifyEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { adminObj } = initDb()
  const verificationString = JSON.parse(req.body)

  const user = await adminObj.update(
    { isVerified: true },
    { where: { verificationString } },
  )

  const userIsVerified: boolean = Boolean(user[0])

  try {
    if (!userIsVerified) {
      return res
        .status(401)
        .json({ message: 'The email verification code is incorrect' })
    }
    //@ts-ignore
    const { id, email } = user

    // aside from not being the best place to set the login cookie, the below will not work because user is NOT returning id and email. sice you have only requested to change isVerified, it is only returning an array https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
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
