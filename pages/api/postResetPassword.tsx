import { NextApiRequest, NextApiResponse } from 'next'
import { hashSync } from 'bcryptjs'

import initDb from '../../helpers/sequelize'

const resetPasswordRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { cboObj } = initDb()
    const { pwd, passwordResetCode } = JSON.parse(req.body)

    const saltRounds: number = 10

    const hashedPassword: string = hashSync(pwd, saltRounds)

    const cbo = await cboObj.update(
      { hashedPassword, passwordResetCode: '' },
      { where: { passwordResetCode } },
    )
    if (cbo[0] !== 1) {
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
