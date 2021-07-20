import { POST } from './validators'
import { Language, PGResponse } from '../types/'

export const searchByKeyword = async (
  searchQuery: string,
  language: Language,
): Promise<PGResponse[]> => {
  const call: Response = await fetch('/api/searchByKeyword', {
    method: POST,
    body: JSON.stringify({
      searchQuery: searchQuery.toLowerCase(),
      language,
    }),
  })

  const translatedCall: PGResponse[] = await call.json()

  return translatedCall
}
