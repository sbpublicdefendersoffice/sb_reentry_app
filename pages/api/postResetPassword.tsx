import bcrypt from 'bcrypt'
import initDb from '../../helpers/sequelize'
import { NextApiRequest, NextApiResponse } from 'next'
const resetPasswordRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { passwordResetCode } = req.body //req.params
  const { adminObj } = initDb()
  const newPassword = req.body
  const saltRounds: number = 10
  let hashedPassword: string
  await bcrypt
    .hash(newPassword, saltRounds)
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
  if (!admin)
    return res
      .status(404)
      .json({ message: 'No user matches password reset code' })

  res.status(200)
}
