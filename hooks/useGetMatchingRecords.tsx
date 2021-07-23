function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1
  if (arr == undefined) {
    return indexes
  }
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i)
  }
  return indexes
}
const getMatchingRecords = (allRecords, keywords) => {
  const filteredRecords = [...allRecords.records].filter(record =>
    keywords.some(keyword => {
      let grabService = record.fields.location_services?.split(',')
      let location_services = grabService?.map(item =>
        item.trimStart().toLowerCase(),
      )
      let grabOrgCustomersServed =
        record.fields.org_customers_served?.split(',')
      let org_customers_served = grabOrgCustomersServed?.map(item =>
        item.toLowerCase(),
      )
      let grabOrgLanguagesSpoken =
        record.fields.org_languages_spoken?.split(',')
      let org_languages_spoken = grabOrgLanguagesSpoken?.map(item =>
        item.trimStart().toLowerCase(),
      )
      let locations_city_prep = record.fields.locations_city?.map(item =>
        item.toLowerCase(),
      )
      let location_latitude_prep = record.fields.location_latitude?.map(
        item => item,
      )
      let location_longitude_prep = record.fields.location_longitude?.map(
        item => item,
      )
      let indexs = getAllIndexes(locations_city_prep, keyword.toLowerCase())
      let locations_city = indexs.map(i => locations_city_prep[i])
      let location_latitude = indexs.map(i => location_latitude_prep[i])
      let location_longitude = indexs.map(i => location_longitude_prep[i])
      if (indexs.length > 0) {
        record.fields.locations_city = locations_city
        record.fields.location_latitude = location_latitude
        record.fields.location_longitude = location_longitude
      }
      return (
        location_services?.includes(keyword.toLowerCase()) ||
        locations_city_prep?.includes(keyword.toLowerCase()) ||
        org_customers_served?.includes(keyword.toLowerCase()) ||
        org_languages_spoken?.includes(keyword.toLowerCase())
      )
    }),
  )
  return { records: filteredRecords, category: allRecords.category }
}
export default getMatchingRecords
