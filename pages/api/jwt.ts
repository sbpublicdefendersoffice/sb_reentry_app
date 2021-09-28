import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'

const secret: string = 'Super Secret, Secret Squirrel!'
const oneDay: number = 86400

const jwt = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  //here is where database sign in logic would happen

  res.setHeader(
    'Set-Cookie',
    `Auth-Token=${sign({ userLoggedIn: true }, secret, {
      expiresIn: `${oneDay}s`,
    })}; Max-Age=${oneDay}; Path=/; HttpOnly; Secure; SameSite=Strict`,
  )
  res.send({})
  try {
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default jwt
