import { NextApiRequest, NextApiResponse } from 'next'
import { Op } from 'sequelize'

import { backendCategories, ENGLISH, SPANISH } from '../../constants/'
import initDb from '../../helpers/sequelize'

const getByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { category, language } = JSON.parse(req.body)
    const finalCategory = String(category).trim().toLowerCase()

    if (
      backendCategories.has(category as string) &&
      (language === ENGLISH || language === SPANISH)
    ) {
      const { orgObj, locObj, servObj } = initDb()

      const returnedOrgs = await orgObj.findAll({
        where: {
          [`categories_${language}`]: { [Op.contains]: [finalCategory] },
        },
        attributes: [
          'id',
          `categories_${language}`,
          `name_${language}`,
          `tags_${language}`,
          ['categories_english', 'multiple_categories'],
        ],
        include: [
          {
            model: locObj,
            required: false,
            attributes: ['latitude', 'longitude', 'city'],
            through: { attributes: [] },
            include: [
              {
                model: servObj,
                required: false,
                attributes: [`name_${language}`],
                through: { attributes: [] },
              },
            ],
          },
        ],
        order: [[`name_${language}`, 'ASC']],
      })

      res.json(returnedOrgs)
    } else {
      throw new Error('language or category parameter is not valid')
    }
  } catch (error) {
    console.error(error.message)
    res.json(error)
  }
}

export default getByCategory
