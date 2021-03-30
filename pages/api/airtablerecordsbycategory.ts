import { NextApiRequest, NextApiResponse } from 'next'

import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'

import { TranslatedRecordResponse, OrgRecord } from '../../types/records'
import { SPANISH } from '../../constants/language'

import { validateRequest, POST } from '../../helpers/validators'

const fetchRecordsByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')

    const { category, language } = JSON.parse(req.body)

    const append: string = language === SPANISH ? `_${SPANISH}` : ''

    const fetchString: string = `${BASE_URL}/organization?filterByFormula=FIND(%22${category}%22%2Corg_categories)&fields%5B%5D=location_latitude&fields%5B%5D=location_longitude&fields%5B%5D=locations_city&fields%5B%5D=org_categories${append}&fields%5B%5D=org_name${append}&fields%5B%5D=org_tags${append}&fields%5B%5D=location_services${append}&sort%5B0%5D%5Bfield%5D=org_name${append}`

    const fetchRecords: Response = await fetch(fetchString, OPTIONS_OBJECT)
    let translatedRecords: TranslatedRecordResponse = await fetchRecords.json()

    while (translatedRecords.offset) {
      // Airtable API has a 5 request per second limit. Hence the delay below
      setTimeout(() => null, 200)

      const { offset, records } = translatedRecords

      const nextPage: Response = await fetch(
        `${fetchString}&offset=${offset}`,
        OPTIONS_OBJECT,
      )

      const translatedNextPage: TranslatedRecordResponse = await nextPage.json()

      const [pageRecords, pageOffset] = [
        translatedNextPage.records,
        translatedNextPage.offset,
      ]

      translatedRecords.records = [...records, ...pageRecords]

      if (pageOffset) translatedRecords.offset = pageOffset
      else delete translatedRecords.offset
    }

    if (language === SPANISH) {
      translatedRecords.records.map((record: OrgRecord) => {
        record.fields.org_name = record.fields.org_name_spanish
        record.fields.org_tags = record.fields.org_tags_spanish
        record.fields.org_categories = record.fields.org_categories_spanish

        return record
      })
    }

    translatedRecords.category = category.replace(/\s/g, '')

    res.json(translatedRecords)
  } catch (error) {
    console.error(error)
  }
}

export default fetchRecordsByCategory
