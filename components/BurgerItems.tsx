import NextLink from 'next/link'
import { bool, func } from 'prop-types'

import { StyledBurgerItems } from './BurgerItems.module.js'
import { ENGLISH } from '../constants/language'

import useLanguage from '../hooks/useLanguage'

const BurgerItems = ({ open, setOpen }) => {
  const { language } = useLanguage()
  return (
    <StyledBurgerItems open={open} onClick={() => setOpen(!open)}>
      <NextLink href="/checklist" as="/checklist">
        <a>
          <h2 role="term">
            {language === ENGLISH
              ? '72 Hour Checklist'
              : 'Lista de verificación de 72 horas'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/successstories" as="/successstories">
        <a>
          <h2 role="term">
            {' '}
            {language === ENGLISH ? 'Success Stories' : 'Historias de éxito'}
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
