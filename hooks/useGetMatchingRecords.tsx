const getMatchingRecords = (allRecords, keywords) => {
  let counter = 0
  const normalizedKeywords = keywords.map(keyword => keyword.toLowerCase())

  const filteredRecords = [...allRecords]
    .filter(record => {
      counter = 0
      const customersServed = record.customers_served_english?.toLowerCase()
      const matchingCustomersServed = normalizedKeywords.some(
        keyword => keyword === customersServed,
      )
      const languagesSpoken = record.languages_spoken_english?.toLowerCase()
      const matchingLanguagesSpoken = normalizedKeywords.some(keyword =>
        languagesSpoken.includes(keyword),
      )

      return record?.locations.some(location => {
        console.log(normalizedKeywords, location.city.toLowerCase())
        const matchesCity = normalizedKeywords.includes(
          location.city.toLowerCase(),
        )

        const matchesServiceName = location?.services.some(service => {
          const serviceName = service?.name_english.toLowerCase()
          return normalizedKeywords.some(keyword => keyword == serviceName)
        })

        return (
          matchesCity ||
          matchesServiceName ||
          matchingCustomersServed ||
          matchingLanguagesSpoken
        )
      })
    })
    .map(record => {
      record.locations = record.locations.filter(location => {
        return normalizedKeywords.includes(location.city.toLowerCase())
      })
      return record
    })

  return filteredRecords
}
export default getMatchingRecords
