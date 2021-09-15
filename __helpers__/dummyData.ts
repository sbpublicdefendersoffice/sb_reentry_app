import {
  OrgRecord,
  LocationRecord,
  ScheduleRecord,
  TranslatedRecordResponse,
  SortedRecord,
  PGOrganizationResponse,
  PGLocationRecord,
  PGOrgPlusLocation,
} from '../types/'

export const customFetch = (
  mockData:
    | OrgRecord
    | LocationRecord
    | ScheduleRecord
    | TranslatedRecordResponse
    | SortedRecord
    | null
    | any,
) =>
  jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    }),
  )

const dummyBaseOrgData: OrgRecord = {
  createdTime: '01/01/1900',
  fields: { org_categories: ['mentalhealth'] },
  id: '1234567890',
}

export const englishDummyOrgData: OrgRecord = {
  ...dummyBaseOrgData,
  fields: {
    ...dummyBaseOrgData.fields,
    org_name: "Dr. Feelgood's Mental Health Emporium",
    org_tags: ['mental health', 'doctor', 'feelgood'],
  },
}

export const secondEnglishDummyOrgData: OrgRecord = {
  ...dummyBaseOrgData,
  fields: {
    ...dummyBaseOrgData.fields,
    org_name: "Tim's Mental Heath Clearing House and Pasta Palace!",
    org_tags: ['mental health', 'pasta', 'tim'],
  },
}

export const spanishDummyOrgData: OrgRecord = {
  ...dummyBaseOrgData,
  fields: {
    ...dummyBaseOrgData.fields,
    org_name_spanish: 'Emporio de salud mental del Dr. Feelgood',
    org_tags_spanish: ['salud mental', 'doctora', 'feelgood'],
  },
}

export const dummyOrgDataWithLocation: OrgRecord = {
  ...dummyBaseOrgData,
  fields: {
    ...dummyBaseOrgData.fields,
    org_name: 'Some org',
    org_tags: ['mental health', 'some', 'tim'],
    location_latitude: [3, 5],
    location_longitude: [-13, -5],
    locations_city: ['Santa Barbara', 'Goleta'],
  },
}

export const blankTranslateRecordResponse: TranslatedRecordResponse = {
  category: 'Transportation',
  records: [],
}

export const dummyTranslateRecordResponse: TranslatedRecordResponse = {
  category: 'Transportation',
  records: [englishDummyOrgData, secondEnglishDummyOrgData],
}

// export const dummyTranslatedRecordWithLocation: TranslatedRecordResponse = {
//   category: 'Mental Health',
//   records: [
//     englishDummyOrgData,
//     secondEnglishDummyOrgData,
//     dummyOrgDataWithLocation,
//   ],
// }

export const blankScheduleRecord: ScheduleRecord = {}

export const dummyScheduleRecord: ScheduleRecord = {
  location_name: 'Santa Barbara',
  locations_id: 9,
  open_time: '12:00',
  close_time: '15:00',
  day: 'Sun, Mon, Tue',
  ordinal_open: '1, 2, 3',
  notes: 'Tests are rad!',
}

export const blankLocationRecord: LocationRecord = {}

export const dummyLocationRecord: LocationRecord = {
  multiple_categories: ['substance use'],
  single_category: 'substance use',
  category: 'substance use',
  id: 9,
  city: 'Santa Barbara',
  address: '1107 San Andres Street',
  address_2: '',
  name: 'Santa Barbara Office',
  state: 'CA',
  email: 'example_org@example.org',
  zip: 93101,
  phone: '(805) 617-9893',
  website: 'http://backtobasicsequineassistedrecovery.com/',
  notes: 'Horses are great!',
  services: 'Sober Living Homes',
  org_name: 'Back to Basics',
  latitude: 34.41503,
  longitude: -119.71157,
  uuid: '0987654321',
}

export const dummySortedRecord: SortedRecord = {
  name: "Tim's Old-Time Southern BBQ!",
  website: 'https://www.timsbbq.food/',
  languages_spoken: 'English, Spanish, Esperanto',
  notes: 'Horses eat free every 3 Tuesday!',
  locations: [dummyLocationRecord],
}

export const locationlessDummySortedRecord: SortedRecord = {
  ...dummySortedRecord,
  locations: [],
}

export const dummyPGLocationRecord: PGLocationRecord = {
  longitude: -119.69805,
  latitude: 34.406876,
  city: 'of angels',
  name: 'location one',
  address: '123 St',
  address_2: 'Apt #1',
  state: 'CA',
  zip: 12345,
  phone: '(123) 456-7890',
  website: 'https://www.blah.com',
  email: 'tim@blah.blah',
  notes: 'fake location',
  schedules: [],
  services: [],
}

export const dummyPGOrgRecord: PGOrganizationResponse = {
  name_english: "Tim's Big Ol' Cafeteria",
  website: 'https://www.timsbigandold.food',
  languages_spoken_english: 'English',
  notes_english: 'Maybe not the best, but definitely the most',
  id: 1,
  categories_english: ['food'],
  categories_spanish: ['comida'],
  name_spanish: 'Cafetería antigua grande de Tim',
  multiple_categories: ['food'],
  single_category: 'food',
  tags_english: ['tim', 'big', 'cafeteria'],
  tags_spanish: ['tim', 'grande', 'cafetería'],
  notes_spanish: 'Tal vez no el mejor, pero definitivamente el más',
  languages_spoken_spanish: 'inglés',
  customers_served_english: 'the hungry',
  customers_served_spanish: 'los hambrientos',
  locations: [dummyPGLocationRecord],
}

export const dummyTranslatedRecordWithLocation: PGOrganizationResponse[] = [
  dummyPGOrgRecord,
]

export const dummyPGOrgPlusLoc: PGOrgPlusLocation = {
  ...dummyPGOrgRecord,
  ...dummyPGLocationRecord,
}
