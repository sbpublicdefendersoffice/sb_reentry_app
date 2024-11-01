import { NextApiRequest, NextApiResponse } from 'next'
import { hashSync } from 'bcryptjs'

import initDb from '../../helpers/sequelize'
const saltRounds: number = 10

const resetPasswordRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { pwd, passwordResetCode } = JSON.parse(req.body)
    const hashedPassword: string = hashSync(pwd, saltRounds)

    if (passwordResetCode.startsWith('cli')) {
      const { clientObj } = initDb()
      const client = await clientObj.update(
        { hashedPassword, passwordResetCode: '' },
        { where: { passwordResetCode } },
      )
      if (client[0] !== 1) throw new Error('Error resetting client password')
    } else {
      const { cboObj } = initDb()
      const cbo = await cboObj.update(
        { hashedPassword, passwordResetCode: '' },
        { where: { passwordResetCode } },
      )
      if (cbo[0] !== 1) throw new Error('Error resetting organization password')
    }

    res.status(200).json({
      message: 'Your password has been reset successfully. You can now log in',
    })
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error: 'An error has occurred.' })
    res.status(500)
  }
}
export default resetPasswordRoute
