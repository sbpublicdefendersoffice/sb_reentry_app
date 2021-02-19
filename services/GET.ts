import { SetStateAction, Dispatch } from 'react'

import { OrgRecord, TranslatedRecordResponse } from '../types/records'
import { Language, ENGLISH } from '../types/language'

const BASE_URL: string = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE}`

const OPTIONS_OBJECT = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
    Referer: 'http://airtable.com',
  },
  referer: 'http://airtable.com',
  refererPolicy: 'origin-when-cross-origin',
}

export const fetchRecordsByCategory = async (
  category: string,
  recordSetFunction: Dispatch<SetStateAction<TranslatedRecordResponse>>,
  language: Language,
): Promise<void> => {
  try {
    let fetchString: string = `${BASE_URL}/organization?filterByFormula=FIND(%22${category}%22%2Corg_categories)&fields%5B%5D=location_latitude&fields%5B%5D=location_longitude`

    if (language === ENGLISH)
      fetchString += '&fields%5B%5D=org_name&fields%5B%5D=org_tags'
    else
      fetchString +=
        '&fields%5B%5D=org_name_spanish&fields%5B%5D=org_tags_spanish'

    const fetchRecords: Response = await fetch(fetchString, OPTIONS_OBJECT)
    let translatedRecords: TranslatedRecordResponse = await fetchRecords.json()

    while (translatedRecords.offset) {
      // Airtable API has a 5 request per second limit. Hence the delay below
      window.setTimeout(() => null, 200)

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

    recordSetFunction(translatedRecords)
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleOrgRecord = async (
  recordId: string,
  recordSetFunction: Dispatch<SetStateAction<OrgRecord>>,
): Promise<void> => {
  try {
    const fetchRecord: Response = await fetch(
      `${BASE_URL}/organization/${recordId}`,
      OPTIONS_OBJECT,
    )

    const translatedRecord: OrgRecord = await fetchRecord.json()

    recordSetFunction(translatedRecord)
  } catch (error) {
    console.error(error)
  }
}
