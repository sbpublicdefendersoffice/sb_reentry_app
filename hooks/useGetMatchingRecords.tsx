function getAllIndexes(arr, val) {
  console.log(
    '🚀 ~ file: useGetMatchingRecords.tsx ~ line 61 ~ getAllIndexes ~ val',
    val,
  )
  console.log('arr:', arr)
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
      let locations_city_prep = record.fields.locations_city?.map(item =>
        item.toLowerCase(),
      )
      console.log(
        '🚀 ~ file: useGetMatchingRecords.tsx ~ line 83 ~ getMatchingRecords ~ locations_city_prep',
        locations_city_prep,
        keyword.toLowerCase(),
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
      console.log('indexs', indexs)
      return (
        location_services?.includes(keyword.toLowerCase()) ||
        locations_city_prep?.includes(keyword.toLowerCase())
      )
    }),
  )
  console.log('filterdRecords', filteredRecords)
  return { records: filteredRecords, category: allRecords.category }
}
export default getMatchingRecords
