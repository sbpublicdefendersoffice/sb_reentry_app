import { SetStateAction, Dispatch } from 'react'
import { Records } from 'airtable'

import { OrgRecord } from '../types/records'

const BASE_URL = `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE}`

const OPTIONS_OBJECT = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}`,
  },
}

export const fetchRecordsByCategory = async (
  category: string,
  recordSetFunction: Dispatch<SetStateAction<OrgRecord[]>>,
): Promise<void> => {
  const fetchRecords: Response = await fetch(
    `${BASE_URL}/organization?filterByFormula=FIND(%22${category}%22%2Corg_categories)&fields%5B%5D=org_name`,
    OPTIONS_OBJECT,
  )
  const translatedRecords: Records<OrgRecord[]> = await fetchRecords.json()
  // @ts-ignore
  const sortedRecords: OrgRecord[] = translatedRecords.records.sort(
    (a: OrgRecord, b: OrgRecord) =>
      a.fields.org_name?.localeCompare(b.fields.org_name),
  )

  recordSetFunction(sortedRecords)
}

export const fetchSingleOrgRecord = async (
  recordId: string,
  recordSetFunction: Dispatch<SetStateAction<OrgRecord>>,
): Promise<void> => {
  const fetchRecord: Response = await fetch(
    `${BASE_URL}/organization/${recordId}`,
    OPTIONS_OBJECT,
  )

  const translatedRecord: OrgRecord = await fetchRecord.json()

  recordSetFunction(translatedRecord)
}
