import { NextApiRequest, NextApiResponse } from 'next'
import cacheData from 'memory-cache'

import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'
import { hourInMs } from '../../constants/cache'

import { TranslatedRecordResponse } from '../../types/records'
import { ENGLISH } from '../../types/language'

import { validateRequest, POST } from '../../helpers/validators'

const fetchRecordsByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')

    const { category, language } = JSON.parse(req.body)

    const key: string = `${category}_${language}`
    const cachedData = cacheData.get(key)

    if (cachedData) {
      res.json(cachedData)
    } else {
      let fetchString: string = `${BASE_URL}/organization?filterByFormula=FIND(%22${category}%22%2Corg_categories)&fields%5B%5D=location_latitude&fields%5B%5D=location_longitude&fields%5B%5D=org_categories`

      if (language === ENGLISH)
        fetchString += '&fields%5B%5D=org_name&fields%5B%5D=org_tags'
      else
        fetchString +=
          '&fields%5B%5D=org_name_spanish&fields%5B%5D=org_tags_spanish'

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

      cacheData.put(key, translatedRecords, hourInMs)

      res.json(translatedRecords)
    }
  } catch (error) {
    console.error(error)
  }
}

export default fetchRecordsByCategory
