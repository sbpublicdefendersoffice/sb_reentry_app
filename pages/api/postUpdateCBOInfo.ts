import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'
const updateCBOInfoRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { orgObj } = initDb()
    // const { authorization } = req.headers

    const { id, name_english, website, languages_spoken_english } = JSON.parse(
      req.body,
    )
    const updates = (({ name_english, website }) => ({
      name_english,
      website,
      languages_spoken_english,
    }))(req.body)

    // if (!authorization) {
    //   return res.status(401).json({ message: 'No authorization header sent' })
    // }

    // const token = authorization.split(' ')[1]

    // jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    //   if (err) {
    //     return res.status(401).json({ message: 'Unable to verify token' })
    //   }
    //   const { isVerified, email } = decoded

    //   if (decoded.id !== id) {
    //     return res.status(403).json({ message: 'Not allowed to update data' })
    //   }
    //   if (!isVerified) {
    //     return res.status(403).json({
    //       message:
    //         'You need to verify your email before you can update your data',
    //     })
    //   }
    const updateCBOInfo = await orgObj.update(
      {
        name_english: name_english,
        website: website,
        languages_spoken_english: languages_spoken_english,
      },
      { where: { id: id } },
    )

    res.status(200)
    res.send(updateCBOInfoRoute)
    // })
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}
export default updateCBOInfoRoute
