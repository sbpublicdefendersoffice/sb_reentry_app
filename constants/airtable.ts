export const BASE_URL: string = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}`

export const OPTIONS_OBJECT = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    Referer: 'http://airtable.com',
  },
  referer: 'http://airtable.com',
  refererPolicy: 'origin-when-cross-origin',
}
