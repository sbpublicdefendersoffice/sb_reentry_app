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
    if (admin[0] !== 1) {
      return res.status(401).json({ message: 'error' })
    }
    res.status(200).json({
      message: 'Your password has been reset successfully. You can now log in',
    })
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default resetPasswordRoute
