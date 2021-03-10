import { NextApiRequest, NextApiResponse } from 'next'
import cacheData from 'memory-cache'

import { OrgRecord } from '../../types/records'
import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'
import { hourInMs } from '../../constants/cache'

import { validateRequest, POST } from '../../helpers/validators'

const fetchSingleOrgRecord = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')

    const { id } = JSON.parse(req.body)

    const cachedData = cacheData.get(id)

    if (cachedData) {
      res.json(cachedData)
    } else {
      const fetchRecord: Response = await fetch(
        `${BASE_URL}/organization/${id}`,
        OPTIONS_OBJECT,
      )
      const translatedRecord: OrgRecord = await fetchRecord.json()

      cacheData.put(id, translatedRecord, hourInMs)

      res.json(translatedRecord)
    }
  } catch (error) {
    console.error(error)
  }
}

export default fetchSingleOrgRecord
