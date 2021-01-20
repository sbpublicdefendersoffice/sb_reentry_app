export type RouteInfo = { title: string; route: string; imgPath: string }

const routes: RouteInfo[] = [
  { title: 'Food', route: '/food', imgPath: './icons/food.svg' },
  {
    title: 'Medical Support',
    route: '/medicalsupport',
    imgPath: './icons/medical.svg',
  },
  {
    title: 'Transportation',
    route: '/transportation',
    imgPath: './icons/transportation.svg',
  },
  {
    title: 'Mental Health',
    route: '/mentalhealth',
    imgPath: './icons/mentalhealth.svg',
  },
  {
    title: 'Social Services',
    route: '/socialservices',
    imgPath: './icons/socialservices.svg',
  },
  { title: 'Clothing', route: '/clothing', imgPath: './icons/clothing.svg' },
  {
    title: 'Resource Directory',
    route: '/resourcedirectory',
    imgPath: './icons/directory.svg',
  },
  {
    title: 'Legal Services',
    route: '/legalservices',
    imgPath: './icons/legal.svg',
  },
  {
    title: 'Community Support',
    route: '/communitysupport',
    imgPath: './icons/community.svg',
  },
  {
    title: 'Employment',
    route: '/employment',
    imgPath: './icons/employment.svg',
  },
  { title: 'Housing', route: '/housing', imgPath: './icons/housing.svg' },
  {
    title: 'Substance Use',
    route: '/substanceuse',
    imgPath: './icons/substanceuse.svg',
  },
]

export default routes
