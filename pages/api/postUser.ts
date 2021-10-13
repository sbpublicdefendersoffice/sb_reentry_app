import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
import bcrypt from 'bcrypt'

const postUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    let { email, pwd, org } = JSON.parse(req.body)

    if (email && pwd && org) {
      const { userObj } = initDb()
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(pwd, saltRounds, (err, hash) => {
        if (err) {
          console.error(err)
          return
        }

        return hash
      })

      const addUser = await userObj.create({
        created_at: new Date(Date.now()),
        email,
        hashedPassword,
        org,
      })

      res.json(addUser)
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default postUser
