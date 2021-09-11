import { NextApiRequest, NextApiResponse } from 'next'

import { ENGLISH, SPANISH } from '../../constants/language'
import initDb from '../../helpers/sequelize'

const getSingleRecord = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { id, language } = JSON.parse(req.body)

    if (language === ENGLISH || language === SPANISH) {
      const { orgObj, locObj, servObj, schObj } = initDb()

      const returnedOrg = await orgObj.findOne({
        where: { id },
        attributes: [
          'id',
          `name_${language}`,
          'website',
          `languages_spoken_${language}`,
          `customers_served_${language}`,
          `notes_${language}`,
          `tags_${language}`,
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
                attributes: ['id', `name_${language}`],
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

      res.json(returnedOrg)
    } else {
      throw new Error('language parameter is not valid')
    }
  } catch (error) {
    console.error(error.message)
    res.json(error)
  }
}

export default getSingleRecord
