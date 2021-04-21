import { isDistanceInBounds, isRegionVisible } from '../../helpers/location'

describe('helper functions for location services', () => {
  it('isRegionVisible returns a boolean that is the second element in an array', () => {
    const isVisible: boolean = isRegionVisible(['I am visible', true])
    const isNotVisible: boolean = isRegionVisible(['I am not visible', false])

    expect(isVisible).toEqual(true)
    expect(isNotVisible).toEqual(false)
  })

  it('isDistanceInBounds returns true when two sets of coordinates are within the given range', () => {
    const distanceInBoundsResult: boolean = isDistanceInBounds(
      [34.42504132437574, -119.70034438031814],
      [34.42874774990439, -119.69663727276838],
      5,
    )

    expect(distanceInBoundsResult).toEqual(true)
  })

  it('isDistanceInBounds returns false when two sets of coordinates are not within the given range', () => {
    const distanceInBoundsResult: boolean = isDistanceInBounds(
      [34.42504132437574, -119.70034438031814],
      [36.042335316545255, -114.98228402574811],
      50,
    )

    expect(distanceInBoundsResult).toEqual(false)
  })
})
