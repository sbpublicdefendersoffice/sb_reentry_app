import { POST } from './validators'
import { Language, PGSearchResponse } from '../types/'

export const searchByKeyword = async (
  searchQuery: string,
  language: Language,
): Promise<PGSearchResponse[]> => {
  const call: Response = await fetch('/api/searchByKeyword', {
    method: POST,
    body: JSON.stringify({
      searchQuery: searchQuery.toLowerCase(),
      language,
    }),
  })

  const translatedCall: PGSearchResponse[] = await call.json()

  return translatedCall
}
