import { NextApiRequest, NextApiResponse } from 'next'

import { validateRequest, POST } from '../../helpers/validators'
import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'

import { TranslatedRecordResponse } from '../../types/records'
import { SPANISH } from '../../types/language'

const globalAirtableSearch = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')
    const { searchQuery, language } = JSON.parse(req.body)

    const append: string = language === SPANISH ? `_${SPANISH}` : ''

    const fetchString: string = `${BASE_URL}/organization?filterByFormula=SEARCH(%22${searchQuery}%22%2Corg_tags${append})&fields%5B%5D=org_name${append}&fields%5B%5D=org_categories&fields%5B%5D=location_latitude&fields%5B%5D=location_longitude&maxRecords=50&sort%5B0%5D%5Bfield%5D=org_name${append}&fields%5B%5D=locations_city`

    const fetchRecords: Response = await fetch(fetchString, OPTIONS_OBJECT)
    const translatedRecords: TranslatedRecordResponse = await fetchRecords.json()

    res.json(translatedRecords)
  } catch (error) {
    console.error(error)
  }
}

export default globalAirtableSearch
