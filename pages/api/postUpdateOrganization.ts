import { NextApiRequest, NextApiResponse } from 'next'
import { reservationsUrl } from 'twilio/lib/jwt/taskrouter/util'
import initDb from '../../helpers/sequelize'

const postUpdateOrganization = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  // disabled because API is not secure.
  // If re-enabling you must authenticate and authorize user
  return res.status(501).json({ error: 'Not implemented.' })

  const { orgObj } = initDb()
  const { id, name_english, website, languages_spoken_english, notes_english } =
    JSON.parse(req.body)

  await orgObj
    .update(
      {
        name_english: name_english,
        website: website,
        languages_spoken_english: languages_spoken_english,
        notes_english: notes_english,
      },
      { where: { id: id } },
    )
    .then(response => {
      res.json({})
    })
    .catch(err => {
      const error: string = err.message
      res.json({ error: 'An error has occurred.' })
    })
}
export default postUpdateOrganization
