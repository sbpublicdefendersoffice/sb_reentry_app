import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

const postFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { is_useful, route, language, comment } = JSON.parse(req.body)
    if ((is_useful === 0 || is_useful === 1) && route && language) {
      const { useObj } = initDb()

      const addFeedback = await useObj.create({
        created_at: new Date(Date.now()),
        is_useful,
        route,
        language,
        comment: comment || null,
      })

      res.json(addFeedback)
    }
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default postFeedback
