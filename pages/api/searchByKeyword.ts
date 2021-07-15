import { NextApiRequest, NextApiResponse } from 'next'
import { Op } from 'sequelize'

import { ENGLISH, SPANISH } from '../../constants/language'
import initDb from '../../helpers/sequelize'

const searchByKeyword = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { query, language } = req.query

    if (language === ENGLISH || language || SPANISH) {
      const { orgObj, locObj } = initDb()
      const finalQuery = String(query).trim().toLowerCase()

      const returnedOrgs = await orgObj.findAll({
        where: {
          [`tags_${language}`]: { [Op.contains]: [finalQuery] },
        },
        attributes: [
          'id',
          `categories_${language}`,
          `name_${language}`,
          `tags_${language}`,
        ],
        include: [
          {
            model: locObj,
            attributes: ['latitude', 'longitude', 'city'],
            through: { attributes: [] },
          },
        ],
        order: [[`name_${language}`, 'ASC']],
      })

      res.json(returnedOrgs)
    } else {
      throw new Error('language parameter is not valid')
    }
  } catch (error) {
    console.error(error.message)
    res.json(error)
  }
}

export default searchByKeyword
