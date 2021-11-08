import { NextApiRequest, NextApiResponse } from 'next'
import initDb from '../../helpers/sequelize'

const postOrg = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const orgId = JSON.parse(req.body)

    const { orgObj, schObj, locObj, servObj } = initDb()

    const org = await orgObj.findOne({
      nest: true,
      where: { id: orgId },
      attributes: [
        'id',
        `name_english`,
        `name_spanish`,
        'website',
        `languages_spoken_english`,
        `languages_spoken_spanish`,
        `customers_served_english`,
        `customers_served_spanish`,
        `notes_english`,
        `notes_spanish`,
        `tags_english`,
        `tags_spanish`,
        ['categories_english', 'multiple_categories'],
      ],
      include: [
        {
          model: locObj,
          required: false,
          through: { attributes: [] },
          include: [
            {
              model: servObj,
              required: false,
              attributes: ['id', `name_english`, `name_spanish`],
              through: { attributes: [] },
            },
            {
              model: schObj,
              required: false,
              through: { attributes: [] },
            },
          ],
        },
      ],
    })

    if (!org) {
      throw new Error('Org does not exist')
    }

    res.status(200).json({ org })
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default postOrg
