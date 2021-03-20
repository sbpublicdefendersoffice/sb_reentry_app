export interface Probation {
  english: ProbationProps
  spanish: ProbationProps
}
interface ProbationProps {
  name: string
  phone: string
  address: string
  cityStateZip: string
}

export const SantaMaria: Probation = {
  english: {
    name: 'Santa Maria PRRC',
    phone: '(805) 346-7620',
    address: '124 W Carmen Lane, Suite K',
    cityStateZip: 'Santa Maria, CA 93458',
  },
  spanish: {
    name: 'Santa Maria PRRC',
    phone: '(805) 346-7620',
    address: '124 W Carmen Lane, Suite K',
    cityStateZip: 'Santa Maria, CA 93458',
  },
}
export const SantaBarbara: Probation = {
  english: {
    name: 'Santa Barbara PRRC',
    phone: '(805) 692-4890',
    address: '4500 Hollister Avenue',
    cityStateZip: 'Santa Barbara, CA 93110',
  },
  spanish: {
    name: 'Santa Barbara PRRC',
    phone: '(805) 692-4890',
    address: '4500 Hollister Avenue',
    cityStateZip: 'Santa Barbara, CA 93110',
  },
}
export const SantaBarbaraAdultServices: Probation = {
  english: {
    name: 'Santa Barbara Adult Services',
    phone: '(805) 882-3700',
    address: '117 East Carrillo Street',
    cityStateZip: 'Santa Barbara, CA 93101',
  },
  spanish: {
    name: 'Servicios para adultos de Santa Bárbara',
    phone: '(805) 882-3700',
    address: '117 East Carrillo Street',
    cityStateZip: 'Santa Barbara, CA 93101',
  },
}
export const LompocAdultJuvenileServices: Probation = {
  english: {
    name: 'Lompoc Adult & Juvenile Services',
    phone: '(805) 737-7800',
    address: '415 East Cypress Avenue',
    cityStateZip: 'Lompoc, CA 93436',
  },
  spanish: {
    name: 'Servicios para adultos y menores de Lompoc',
    phone: '(805) 737-7800',
    address: '415 East Cypress Avenue',
    cityStateZip: 'Lompoc, CA 93436',
  },
}
export const SantaMariaAdultJuvenileServices: Probation = {
  english: {
    name: 'Santa Maria Adult & Juvenile Services',
    phone: '(805) 803-8500',
    address: '2121 South Centerpointe Parkway',
    cityStateZip: 'Santa Maria, CA 93455',
  },
  spanish: {
    name: 'Servicios para adultos y menores de Santa María',
    phone: '(805) 803-8500',
    address: '2121 South Centerpointe Parkway',
    cityStateZip: 'Santa Maria, CA 93455',
  },
}
export const VenturaCountyRegionalOffice: Probation = {
  english: {
    name: 'Ventura County Regional Office',
    phone: '(805) 382-8151',
    address: '1555 West 5th Street, Suite #102',
    cityStateZip: 'Oxnard, CA 93030',
  },
  spanish: {
    name: 'Oficina Regional del Condado de Ventura',
    phone: '(805) 382-8151',
    address: '1555 West 5th Street, Suite #102',
    cityStateZip: 'Oxnard, CA 93030',
  },
}
export const SanLuisdObispoStoreFront: Probation = {
  english: {
    name: 'San Luis Obispo Store Front',
    phone: '(805) 347-0058',
    address: '1775 South McClellan Street',
    cityStateZip: 'Santa Maria, CA 93454',
  },
  spanish: {
    name: 'Frente de la tienda de San Luis Obispo',
    phone: '(805) 347-0058',
    address: '1775 South McClellan Street',
    cityStateZip: 'Santa Maria, CA 93454',
  },
}

export const probations: Probation[] = [
  SantaMaria,
  SantaBarbara,
  SantaBarbaraAdultServices,
  LompocAdultJuvenileServices,
  SantaMariaAdultJuvenileServices,
  VenturaCountyRegionalOffice,
  SanLuisdObispoStoreFront,
]
