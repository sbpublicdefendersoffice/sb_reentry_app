import { POST } from './validators'
import { Language, PGOrganizationResponse } from '../types/'

export const searchByKeyword = async (
  searchQuery: string,
  language: Language,
): Promise<PGOrganizationResponse[]> => {
  const call: Response = await fetch('/api/searchByKeyword', {
    method: POST,
    body: JSON.stringify({
      searchQuery: searchQuery.toLowerCase(),
      language,
    }),
  })

  const translatedCall: PGOrganizationResponse[] = await call.json()

  return translatedCall
}
