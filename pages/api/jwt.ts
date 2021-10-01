import { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'

const oneWeekInSeconds: number = 604800

const jwt = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // here is where database sign in logic would happen

  // in production, i think that the cookie will only contain the user id and type of user, cbo or client
  // other info will be contained in the body of the response and will be saved to global context

  // doubtful that bcrypt will need to run more than a dozen rounds of hashing
  // will probably want to adjust Path parameter in header once the secure routes have been figured out
  res.setHeader(
    'Set-Cookie',
    `Auth-Token=${sign({ userLoggedIn: true }, process.env.JWT_SIGNATURE, {
      expiresIn: `${oneWeekInSeconds}s`,
    })}; Max-Age=${oneWeekInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
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
