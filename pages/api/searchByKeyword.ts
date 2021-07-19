import { NextApiRequest, NextApiResponse } from 'next'
import { Op, fn, where, col } from 'sequelize'

import { ENGLISH, SPANISH } from '../../constants/language'
import initDb from '../../helpers/sequelize'

const searchByKeyword = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { searchQuery, language } = JSON.parse(req.body)

    if (language === ENGLISH || language === SPANISH) {
      const { orgObj, locObj } = initDb()
      const finalQuery = String(searchQuery).trim().toLowerCase()

      const returnedOrgs = await orgObj.findAll({
        where: where(fn('ARRAY_TO_STRING', col(`tags_${language}`), ''), {
          [Op.substring]: finalQuery,
        }),
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
  } catch (err) {
    const error: string = err.message
    console.error(error)
    res.json({ error })
  }
}

export default searchByKeyword
