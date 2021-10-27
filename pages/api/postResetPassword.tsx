import bcrypt from 'bcrypt'
import initDb from '../../helpers/sequelize'
import { NextApiRequest, NextApiResponse } from 'next'
const resetPasswordRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { adminObj } = initDb()
    const { pwd, passwordResetCode } = JSON.parse(req.body)
    const saltRounds: number = 10
    let hashedPassword: string
    await bcrypt
      .hash(pwd, saltRounds)
      .then(hash => {
        hashedPassword = hash
      })
      .catch(err => {
        console.log(err)
      })
    const admin = await adminObj.update(
      { hashedPassword: hashedPassword, passwordResetCode: '' },
      { where: { passwordResetCode: passwordResetCode } },
    )
    if (!admin) {
      res.status(404)

      throw new Error('No user matches password reset code')
    }

    res.status(200).end()
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default resetPasswordRoute
