import { NextApiRequest, NextApiResponse } from 'next'
import { getDb } from '../../helpers/sequelize'

const addFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { is_useful, route, language, comment } = req.body
    if (is_useful && route && language) {
      const { useObj } = getDb()

      const addFeedback = await useObj.create({
        created_at: new Date(Date.now()),
        is_useful,
        route,
        language,
        comment: comment || null,
      })

      res.json(addFeedback)
    }
  } catch (error) {
    console.error(error.message)
    res.json(error)
  }
}

export default addFeedback
