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
  } catch (error) {
    console.error(error.message)
    res.json(error)
  }
}

export default searchByKeyword

// postgres record below
// 0:
// categories_english: Array(1)
// 0: "substance use"
// length: 1
// __proto__: Array(0)
// id: 905
// locations: Array(1)
// 0:
// city: "Santa Barbara"
// latitude: 34.4373242
// longitude: -119.7796434
// length: 1
// name_english: "Andrew's Presbyterian Church"
// tags_english: Array(14)
// 0: "substance use"
// 1: "alcoholics anonymous"
// 2: "drugs"
// 3: "addiction"
// 4: "wed"
// 5: "mon"
// 6: "4575 auhay drive"
// 7: "andrews presbyterian church"
// 8: "93110"
// 9: "english"
// 10: "santa barbara"
// 11: "recovery"
// 12: "alcoholic anonymous"
// 13: "alcohol"
// length: 14

// airtable record below
// 0:
// createdTime: "2020-12-03T19:16:16.000Z"
// fields:
// location_latitude: Array(1)
//    0: 34.4373242
// length: 1
// location_longitude: Array(1)
//    0: -119.7796434
// length: 1
// locations_city: Array(1)
//    0: "Santa Barbara"
// length: 1
// org_categories: Array(1)
//    0: "substance use"
// length: 1
// org_categories_spanish: Array(1)
//    0: "uso de sustancias"
// length: 1
// org_name: "Andrew's Presbyterian Church"
// org_tags: Array(1)
//    0: "andrews presbyterian church"
// length: 1
// id: "recSxHRqkUnW0LHjB"
