import { OrgRecord, LocationRecord, ScheduleRecord } from '../types/records'

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

export const spanishDummyOrgData: OrgRecord = {
  ...dummyBaseOrgData,
  fields: {
    ...dummyBaseOrgData.fields,
    org_name_spanish: 'Emporio de salud mental del Dr. Feelgood',
    org_tags_spanish: ['salud mental', 'doctora', 'feelgood'],
  },
}

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
