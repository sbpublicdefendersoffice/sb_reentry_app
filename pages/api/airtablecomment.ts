import { NextApiRequest, NextApiResponse } from 'next'

import { BASE_URL, OPTIONS_OBJECT } from '../../constants/airtable'
import { Feedback } from '../../types/records'

import { validateRequest, POST } from '../../helpers/validators'

const postCommentToAirtable = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    if (!validateRequest(req, POST))
      throw new Error('Unauthorized origin or method')

    const { is_useful, route, language, comment } = JSON.parse(req.body)

    console.log(is_useful, route, language, comment)

    // const fetchString: string = ``

    // const postRecord: Response = await fetch(fetchString, OPTIONS_OBJECT)
    // let translatedRecords = await postRecord.json()

    res.json(JSON.stringify({ message: 'it sent!' }))
  } catch (error) {
    console.error(error)
  }
}

export default postCommentToAirtable
