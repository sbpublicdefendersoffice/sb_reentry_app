import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
import { ValidationError } from '../../helpers'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
const oneWeekInSeconds: number = 604800

const postLogin = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    const { email, pwd, signupType } = body

    if (email && pwd) {
      if (signupType && signupType === 'client') {
        const { clientObj } = initDb()
        const client = await clientObj.findOne({ where: { email } })

        if (!client)
          throw new ValidationError('Email or password is incorrect.')

        const isCorrect: boolean = await compare(pwd, client.hashedPassword)

        if (isCorrect) {
          const { id, isVerified, hasAppliedForExpungement, email, commPrefs } =
            client

          const type = { type: 'client' }

          res.setHeader(
            'Set-Cookie',
            `Auth-Token=${jwt.sign(
              {
                id,
                isVerified,
                hasAppliedForExpungement,
                email,
                commPrefs,
                ...type,
              },
              process.env.JWT_SIGNATURE,
              {
                expiresIn: '7d',
              },
            )}; Max-Age=${oneWeekInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
          )

          res.status(200).json(type)
        } else throw new ValidationError('Email or password is incorrect.')
      } else {
        const { cboObj } = initDb()
        const cbo = await cboObj.findOne({ where: { email } })

        if (!cbo) throw new ValidationError('Email or password is incorrect.')

        const isCorrect: boolean = await compare(pwd, cbo.hashedPassword)

        if (isCorrect) {
          const { id, isVerified, orgId } = cbo

          const type = { type: 'cbo' }

          res.setHeader(
            'Set-Cookie',
            `Auth-Token=${jwt.sign(
              { id, isVerified, orgId, ...type },
              process.env.JWT_SIGNATURE,
              {
                expiresIn: '7d',
              },
            )}; Max-Age=${oneWeekInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
          )

          res.status(200).json(type)
        } else throw new ValidationError('Email or password is incorrect.')
      }
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    if (err instanceof ValidationError) {
      res.json({ error })
    } else {
      res.json({ error: 'An error has occurred.' })
    }
  }
}

export default postLogin
