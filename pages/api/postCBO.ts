import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { sendEmail } from '../../helpers'

const postCBO = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    let { email, pwd, org } = JSON.parse(req.body)
    if (email && pwd && org) {
      const { cboObj } = initDb()
      // @ts-ignore
      const cbo = await cboObj.findOne({ where: { email: email } })

      if (cbo) {
        throw new Error('Email Already Exists')
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
      const addCBO = await cboObj.create({
        created_at: new Date(Date.now()),
        email,
        hashedPassword,
        org,
        verificationString,
        isVerified: false,
      })

      res.json(addCBO)
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
    try {
      //@ts-ignore
      await sendEmail({
        to: 'vsauceda@codeforamerica.org',
        from: 'verification@thrivesbc.com',
        subject: 'Verify Account',
        text: `
        
                ${email} has just created an account for ${org}

        ✅ Make sure the account has been verified in the database. 
        ✅ Verify that the person is actually associated with ${org}. Through email domain, Linkedin or other research methods.
        ✅ Make sure to assign this person to the correct organization which should be ➡️ ${org}.
        ✅ Respond to ${email} when the all three steps are completed and inform them that they are now allowed to login to their dashboard.
         `,
      })
    } catch (err) {
      console.log(err)
      res.status(500)
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default postCBO
