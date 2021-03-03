import { NextApiRequest, NextApiResponse } from 'next'

import { OrgRecord } from '../../types/records'
import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'

const fetchSingleOrgRecord = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const { id } = JSON.parse(req.body)

    const fetchRecord: Response = await fetch(
      `${BASE_URL}/organization/${id}`,
      OPTIONS_OBJECT,
    )
    const translatedRecord: OrgRecord = await fetchRecord.json()

    res.json(translatedRecord)
  } catch (error) {
    console.error(error)
  }
}

export default fetchSingleOrgRecord
