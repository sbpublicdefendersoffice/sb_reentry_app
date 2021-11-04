import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const oneWeekInSeconds: number = 604800

const postLogin = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { email, pwd } = JSON.parse(req.body)

    if (email && pwd) {
      const { cboObj } = initDb()
      //@ts-ignore
      const cbo = await cboObj.findOne({ where: { email } })

      if (!cbo) {
        throw new Error('Email does not exist')
      }

      const { id, isVerified, hashedPassword } = cbo

      const isCorrect: boolean = await bcrypt.compare(pwd, hashedPassword)
      if (!isCorrect) {
        throw new Error('Email or password is incorrect. Please try again')
      }
      if (isCorrect) {
        res.setHeader(
          'Set-Cookie',
          `Auth-Token=${jwt.sign(
            { id, isVerified },
            process.env.JWT_SIGNATURE,
            {
              expiresIn: `${oneWeekInSeconds}s`,
            },
          )}; Max-Age=${oneWeekInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        )

        res.status(200).send({})

        // jwt.sign(
        //   { id, email, isVerified },
        //   process.env.JWT_SECRET,
        //   { expiresIn: '2d' },
        //   (err, token) => {
        //     if (err) {
        //       res.status(500).json(err)
        //     }
        //     res.status(200).json({ token })
        //   },
        // )
      }
      // else {
      //   res.status(401).end()
      //   return
      // }
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default postLogin
