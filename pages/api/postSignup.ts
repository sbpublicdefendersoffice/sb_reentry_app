import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuid } from 'uuid'
import { hashSync } from 'bcryptjs'

import { sendEmail } from '../../helpers/sendEmail'
import initDb from '../../helpers/sequelize'
import { isProd } from '../../constants'

const saltRounds: number = 10
let verificationString: string

const postSignup = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const body = JSON.parse(req.body)
    let { email, pwd, org, orgWebsite, signupType, customers, languageSpoken } =
      body

    if (email && pwd) {
      if (signupType && signupType === 'client') {
        const { clientObj } = initDb()
        const client = await clientObj.findOne({ where: { email: email } })

        if (client) {
          throw new Error('Email Already Exists')
        }

        const hashedPassword: string = hashSync(pwd, saltRounds)
        verificationString = `cli${uuid().slice(3)}`

        const commPrefs: string[] = Object.entries(body)
          .filter(([_, value]) => value === true) // eslint-disable-line no-unused-vars
          .map(arr => arr[0])

        const addClient = await clientObj.create({
          created_at: new Date(Date.now()),
          email,
          hashedPassword,
          verificationString,
          isVerified: false,
          hasAppliedForExpungement: false,
          hasBeenNotifiedOfExpungement: false,
          commPrefs,
        })

        res.json(addClient)
      } else {
        if (org) {
          const { cboObj } = initDb()

          const cbo = await cboObj.findOne({ where: { email: email } })

          if (cbo) {
            throw new Error('Email Already Exists')
          }

          const hashedPassword: string = hashSync(pwd, saltRounds)

          verificationString = uuid()
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
              to: process.env.SBPD_MAINTAINER,
              from: 'verification@thrivesbc.com',
              subject: 'Verify Account',
              text: `
              
                      ${email} has just created an account for ${org}
      
              ✅ Make sure the account has been verified in the database. 
              ✅ Verify that the person is actually associated with ${org}. Through email domain, Linkedin or other research methods.
                website: ${orgWebsite}
                customers served: ${customers}
                language spoken: ${languageSpoken}
              ✅ Make sure to assign this person to the correct organization which should be ➡️ ${org}.
              ✅ Respond to ${email} when the all three steps are completed and inform them that they are now allowed to login to their dashboard.
               `,
            })
          } catch (err) {
            console.error(err)
            res.status(500)
          }
        }
      }
      try {
        //@ts-ignore
        await sendEmail({
          to: email,
          from: 'verification@thrivesbc.com',
          subject: 'Please verify for your email',
          text: `Thanks for signing up! To verify your email, click here:
             ${
               isProd ? 'https://www.thrivesbc.com' : 'http://localhost:3000'
             }/verifyemail/${verificationString}`,
        })
      } catch (err) {
        console.error(err)
        res.status(500)
      }
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
    res.status(500)
  }
}
export default postSignup
