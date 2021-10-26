import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers'
import jwt from 'jsonwebtoken'

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
        // res.status(403).json({ message: 'User already exists' })
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
      jwt.sign(
        {
          id: id,
          email,
          isVerified: false,
        },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: err })
          }

          res.status(200).json({ token })
        },
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
