import { OrgRecord } from '../../types/records'

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
