import NextLink from 'next/link'
import { bool, func } from 'prop-types'

import { StyledBurgerItems } from './BurgerItems.module'
import { ENGLISH } from '../constants/language'

import useLanguage from '../hooks/useLanguage'

const BurgerItems = ({ open, setOpen }) => {
  const { language } = useLanguage()
  return (
    <StyledBurgerItems open={open} onClick={() => setOpen(!open)}>
      <NextLink href="/checklist" as="/checklist">
        <a>
          <h2 role="term">
            {language === ENGLISH ? 'Resource Checklist' : 'Lista de recursos'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/thrivestories" as="/thrivestories">
        <a>
          <h2 role="term">
            {' '}
            {language === ENGLISH ? 'Thrive Stories' : 'Historias de éxito'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/knowyourrights" as="/knowyourrights">
        <a>
          <h2 role="term">
            {language === ENGLISH ? 'Know Your Rights' : 'Conoce tus derechos'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/aboutus" as="/aboutus">
        <a>
          <h2 role="term">
            {' '}
            {language === ENGLISH ? 'About Us' : 'Sobre nosotros'}
          </h2>
        </a>
      </NextLink>
    </StyledBurgerItems>
  )
}

BurgerItems.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default BurgerItems
