import { Model, ModelCtor } from 'sequelize'

export interface OrganizationModel extends Model {
  id: number
  name_english: string
  name_spanish: string
  website: string
  languages_spoken_english: string
  languages_spoken_spanish: string
  customers_served_english: string
  customers_served_spanish: string
  notes_english: string
  notes_spanish: string
  categories_english: string
  categories_spanish: string
  tags_english: string
  tags_spanish: string
  locations?: LocationsModel[]
  single_category?: string
}

export interface LocationsModel extends Model {
  id: number
  latitude: number
  longitude: number
  zip: number
  city: string
  name: string
  website: string
  address: string
  address_2: string
  state: string
  phone: string
  email: string
  notes: string
  services?: ServiceModel[]
  schedules?: SchedulesModel[]
}

export interface ServiceModel extends Model {
  id: number
  name_english: string
  name_spanish: string
}

export interface SchedulesModel extends Model {
  id: number
  open_time: string
  close_time: string
  days: string
  notes: string
}

export interface LocationsOrganizationsModel extends Model {
  locations_id: number
  organizations_id: number
}

export interface SchedulesLocationsModel extends Model {
  schedules_id: number
  locations_id: number
}

export interface SchedulesOrganizationsModel extends Model {
  schedules_id: number
  organizations_id: number
}

export interface ServicesLocationsModel extends Model {
  services_id: number
  locations_id: number
}

export interface ServicesOrganizationsModel extends Model {
  services_id: number
  organizations_id: number
}

export interface IsThisUsefulModel extends Model {
  id: number
  created_at: string
  is_useful: boolean
  route: string
  language: string
  comment: string
}

export interface ClientModel extends Model {
  id: number
  created_at: string
  email: string
  hasAppliedForExpungement: boolean
  expungementEmail: string
  expungementXMessageId: string
  hasBeenNotifiedOfExpungement: boolean
  commPrefs: string[]
  hashedPassword: string
  verificationString: string
  passwordResetCode: string
  isVerified: boolean
}

export interface CBOModel extends Model {
  id?: number
  created_at: string
  email: boolean
  org: string
  hashedPassword: string
  verificationString: string
  passwordResetCode: string
  isVerified: boolean
  orgId: number
}
export type Organization = ModelCtor<OrganizationModel>
export type Location = ModelCtor<LocationsModel>
export type Service = ModelCtor<ServiceModel>
export type Schedule = ModelCtor<SchedulesModel>
export type LocationOrganization = ModelCtor<LocationsOrganizationsModel>
export type ScheduleLocation = ModelCtor<SchedulesLocationsModel>
export type ScheduleOrganization = ModelCtor<SchedulesOrganizationsModel>
export type ServiceLocation = ModelCtor<ServicesLocationsModel>
export type ServiceOrganization = ModelCtor<ServicesOrganizationsModel>
export type IsThisUseful = ModelCtor<IsThisUsefulModel>
export type Client = ModelCtor<ClientModel>
export type CBO = ModelCtor<CBOModel>

export interface AllModels {
  orgObj: Organization
  locObj: Location
  servObj: Service
  schObj: Schedule
  useObj: IsThisUseful
  clientObj: Client
  cboObj: CBO
}
