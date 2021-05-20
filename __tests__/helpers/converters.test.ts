import { LocationRecord } from '../../types/records'
import {
  dummyTranslateRecordResponse,
  dummyTranslatedRecordWithLocation,
} from '../../__helpers__/dummyData'

import { convertLocationsForMap } from '../../helpers/converters'

describe('converter helper function(s)', () => {
  it('returns null when there are no location records present in input', () => {
    const returnResponse: LocationRecord[] | null = convertLocationsForMap(
      dummyTranslateRecordResponse,
    )

    expect(returnResponse).toEqual([])
  })

  it('returns truthy when there are location records present in input', () => {
    const returnResponse: LocationRecord[] | null = convertLocationsForMap(
      dummyTranslatedRecordWithLocation,
    )

    const expectedReturn: string[] = [
      '{"multiple_categories":["mentalhealth"],"single_category":"Mental Health","longitude":-13,"latitude":3,"city":"Santa Barbara","name":"Some org","uuid":"1234567890"}',
      '{"multiple_categories":["mentalhealth"],"single_category":"Mental Health","longitude":-5,"latitude":5,"city":"Goleta","name":"Some org","uuid":"1234567890"}',
    ]

    returnResponse.forEach((record: LocationRecord, i: number) =>
      expect(JSON.stringify(record)).toEqual(expectedReturn[i]),
    )
  })
})
