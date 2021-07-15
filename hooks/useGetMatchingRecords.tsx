const useGetMatchingRecords = (allRecords, keywords) => {
  const filteredRecords = allRecords.records.filter(record =>
    keywords.some(keyword => {
      let orgTags = record.fields.org_tags.map(item => item.toLowerCase())
      return orgTags.includes(keyword.toLowerCase())
    }),
  )
  return { records: filteredRecords, category: allRecords.category }
}
export default useGetMatchingRecords
