const getMatchingRecords = (allRecords, keywords) => {
  const filteredRecords = allRecords.records.filter(record =>
    keywords.some(keyword => {
      let grabService = record.fields.location_services?.split(',')
      let location_services = grabService?.map(item =>
        item.trimStart().toLowerCase(),
      )
      let locations_city = record.fields.locations_city?.map(item =>
        item.toLowerCase(),
      )
      return (
        location_services?.includes(keyword.toLowerCase()) ||
        locations_city?.includes(keyword.toLowerCase())
      )
    }),
  )
  return { records: filteredRecords, category: allRecords.category }
}
export default getMatchingRecords
