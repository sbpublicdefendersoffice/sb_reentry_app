const hourInSeconds = 3600

const cache = {
  key: 'Cache-Control',
  value: `public, max-age=${hourInSeconds}, s-maxage=${hourInSeconds}, stale-while-revalidate=${hourInSeconds}`,
}

module.exports = cache
