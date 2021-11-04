import jwt from 'jsonwebtoken'

import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
export const urlSlug: string = '/admins/[id]'
const updateAdminInfoRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    // const { adminObj } = initDb()
    const { authorization } = req.headers

    //@ts-ignore
    const { userId } = req.params

    const updates = (({ org, website }) => ({
      org,
      website,
    }))(req.body)

    if (!authorization) {
      return res.status(401).json({ message: 'No authorization header sent' })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({ message: 'Unable to verify token' })

      const { id, isVerified, email } = decoded

      if (id !== userId)
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" })
      if (!isVerified)
        return res.status(403).json({
          message:
            'You need to verify your email before you can update your data',
        })
      // const updateAdminInfo = await adminObj.update(
      //   { org: updates.org },
      //   { where: { id: id } },
      // )

      // const { org, info } = updateAdminInfo
      // something not right here

      jwt.sign(
        { id, isVerified, email },
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
          if (err) {
            return res.status(200).json(err)
          }
          res.status(200).json({ token })
        },
      )
    })
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default updateAdminInfoRoute
