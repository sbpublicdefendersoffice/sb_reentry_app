import { NextApiRequest, NextApiResponse } from 'next'

import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'
import { validateRequest, POST } from '../../helpers/validators'

const postCommentToAirtable = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')

    const postRecord: Response = await fetch(`${BASE_URL}/is_this_useful`, {
      ...OPTIONS_OBJECT,
      headers: {
        ...OPTIONS_OBJECT.headers,
        'Content-Type': 'application/json',
      },
      method: POST,
      body: `{"fields": ${req.body}}`,
    })
    const translatedResponse = await postRecord.json()

    res.json(translatedResponse)
  } catch (error) {
    console.error(error)
  }
}

export default postCommentToAirtable
