import { NextApiRequest, NextApiResponse } from 'next'

import { validateRequest, POST } from '../../helpers/validators'

const globalAirtableSearch = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')
    const { searchQuery } = JSON.parse(req.body)

    console.log(searchQuery)

    res.json({ messageRecieved: true })
  } catch (error) {
    console.error(error)
  }
}

export default globalAirtableSearch
