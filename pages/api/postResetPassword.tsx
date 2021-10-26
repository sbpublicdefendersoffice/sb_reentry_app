import bcrypt from 'bcrypt'
import initDb from '../../helpers/sequelize'
import { NextApiRequest, NextApiResponse } from 'next'
const resetPasswordRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // const { passwordResetCode } = req.body //req.params
    const { adminObj } = initDb()
    const { pwd, passwordResetCode } = JSON.parse(req.body)
    console.log(
      '🚀 ~ file: postResetPassword.tsx ~ line 11 ~ passwordResetCode 🚨',
      passwordResetCode,
    )
    console.log('🚀 ~ file: postResetPassword.tsx ~ line 11 ~ pwd 🔥', pwd)

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
      console.log('No user Matches this one 🤣')
      return res
        .status(404)
        .json({ message: 'No user matches password reset code' })
    }
    console.log('Right berrfore the 200 🚨😁')
    res.status(200)
    // res.end
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default resetPasswordRoute
