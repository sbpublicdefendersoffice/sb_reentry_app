import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers'
import { sign } from 'jsonwebtoken'
const oneWeekInSeconds: number = 604800
const postUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    let { email, pwd, org } = JSON.parse(req.body)
    if (email && pwd && org) {
      const { adminObj } = initDb()
      // @ts-ignore
      const user = await adminObj.findOne({ where: { email: email } })
      if (user) {
        throw new Error('User Already Exists')
      }
      const saltRounds = 10
      let hashedPassword: string
      await bcrypt
        .hash(pwd, saltRounds)
        .then(hash => {
          hashedPassword = hash
        })
        .catch(err => {
          console.log(err)
        })
      const verificationString = uuid()
      const addAdmin = await adminObj.create({
        created_at: new Date(Date.now()),
        email,
        hashedPassword,
        org,
        verificationString,
        isVerified: false,
      })
      const { id } = addAdmin
      res.setHeader(
        'Set-Cookie',
        `Auth-Token=${sign({ userLoggedIn: true }, process.env.JWT_SIGNATURE, {
          expiresIn: `${oneWeekInSeconds}s`,
        })}; Max-Age=${oneWeekInSeconds}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      )
      res.json(addAdmin)
      try {
        //@ts-ignore
        await sendEmail({
          to: email,
          from: 'verification@thrivesbc.com',
          subject: 'Please verify for your email',
          text: `Thanks for signing up! To verify your email, click here:
             http://localhost:3000/verifyemail/${verificationString}`,
        })
      } catch (err) {
        console.log(err)
        res.status(500)
      }
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default postUser
