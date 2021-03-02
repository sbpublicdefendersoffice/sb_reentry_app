import NextLink from 'next/link'
import styles from './Header.module.css'
import { bool, func } from 'prop-types'
import { StyledBurgerItems } from './BurgerItems.module.js'
import React, { useState } from 'react'
import { FunctionsRounded } from '@material-ui/icons'
import { ENGLISH } from '../types/language'

import useLanguage from '../hooks/useLanguage'

const BurgerItems = ({ open, setOpen }) => {
  const { language } = useLanguage()
  return (
    <StyledBurgerItems open={open} onClick={() => setOpen(!open)}>
      <NextLink href="/checklist" as="/success-stories">
        <a>
          <h2>
            {language === ENGLISH
              ? '72 Hour Checklist'
              : 'Lista de verificación de 72 horas'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/success-stories" as="/success-stories">
        <a>
          <h2>
            {' '}
            {language === ENGLISH ? 'Success Stories' : 'Historias de éxito'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/know-your-rights" as="/know-your-rights">
        <a>
          <h2>
            {language === ENGLISH ? 'Know Your Rights' : 'Conoce tus derechos'}
          </h2>
        </a>
      </NextLink>
      <NextLink href="/about-us" as="/about-us">
        <a>
          <h2> {language === ENGLISH ? 'About Us' : 'Sobre nosotros'}</h2>
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
