import { POST } from './validators'
import { Language, TranslatedRecordResponse } from '../types/'

export const searchByKeyword = async (
  searchQuery: string,
  language: Language,
): Promise<TranslatedRecordResponse> => {
  const call: Response = await fetch('/api/airtablerecordsbykeyword', {
    method: POST,
    body: JSON.stringify({
      searchQuery: searchQuery.toLowerCase(),
      language,
    }),
  })

  const translatedCall: TranslatedRecordResponse = await call.json()

  return translatedCall
}
