import NextLink from 'next/link'
import Burger from './Burger'
import BurgerItems from './BurgerItems'
import useLanguage from '../hooks/useLanguage'
import React, { useState, useRef } from 'react'
import styles from './Header.module.css'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import { CopyHolder, ENGLISH } from '../types/language'
import { FreshStartLogo } from '../ui'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import ListItemText from '@material-ui/core/ListItemText'
const Header = () => {
  const { language } = useLanguage()
  const [open, setOpen] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setOpen(false))
  const copy: CopyHolder = {
    english: {
      checklist: '72 Hour Checklist',
      successStory: 'Success Stories',
      knowYourRights: 'Know Your Rights',
      aboutUs: 'About Us',
    },
    spanish: {
      checklist: 'Lista de verificación de 72 horas',
      successStory: 'Historias de éxito',
      knowYourRights: 'Conoce tus derechos',
      aboutUs: 'Sobre nosotros',
    },
  }
  const activeCopy = copy[language]
  return (
    <header role="banner" className={styles.Header}>
      <Grid container spacing={3}>
        <NextLink href="/" as="/">
          <a className="not-text-link">
            <FreshStartLogo
              style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
              className={styles.FreshStart}
              color="light"
            />
          </a>
        </NextLink>
        <Grid item xs={6} sm={4}>
          <List className={styles.HeaderContainer}>
            <ListItem className={styles.NavListItem}>
              <ListItemText>
                <NextLink href="/checklist" as="/checklist">
                  <a>
                    <h2 className={styles.Title}>{activeCopy.checklist}</h2>
                  </a>
                </NextLink>
              </ListItemText>
            </ListItem>
            <ListItem className={styles.NavListItem}>
              <ListItemText>
                <NextLink href="/success-stories" as="/success-stories">
                  <a>
                    <h2 className={styles.Title}>{activeCopy.successStory}</h2>
                  </a>
                </NextLink>
              </ListItemText>
            </ListItem>
            <ListItem className={styles.NavListItem}>
              <ListItemText>
                <NextLink href="/know-your-rights" as="/know-your-rights">
                  <a>
                    <h2 className={styles.Title}>
                      {activeCopy.knowYourRights}
                    </h2>
                  </a>
                </NextLink>
              </ListItemText>
            </ListItem>
            <ListItem className={styles.NavListItem}>
              <ListItemText>
                <NextLink href="/about-us" as="/about-us">
                  <a>
                    <h2 className={styles.Title}>{activeCopy.aboutUs}</h2>
                  </a>
                </NextLink>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <div ref={node}>
        <Burger open={open} setOpen={setOpen} />
        <BurgerItems open={open} setOpen={setOpen} />
      </div>
    </header>
  )
}
export default Header
