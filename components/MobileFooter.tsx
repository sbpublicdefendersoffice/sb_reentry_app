import React, { useRef } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Toolbar } from '@mui/material'

import { Search, ArrowBack, Home } from '@mui/icons-material'
import { useOnClickOutside } from '../hooks/'

import { useStyles } from '../constants'
import LiveDataSearch from './LiveDataSearch'

const MobileFooter = () => {
  const classes = useStyles()
  const [showSearchBar, setShowSearchBar] = React.useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setShowSearchBar(false))
  const { back } = useRouter()

  return (
    <AppBar position="fixed" className={classes.appBar} ref={node}>
      <Toolbar>
        {!showSearchBar ? (
          <>
            <ArrowBack
              className={classes.footerIcons}
              fontSize="large"
              onClick={() => back()}
            />
            <NextLink href="/" as="/">
              <Home className={classes.footerIcons} fontSize="large" />
            </NextLink>

            <Search
              className={classes.footerIcons}
              fontSize="large"
              onClick={() => setShowSearchBar(true)}
            />
          </>
        ) : (
          <div
            ref={node}
            style={{
              display: 'flex',
              marginBottom: '3rem',
              justifyContent: 'center',
            }}
          >
            <LiveDataSearch />
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default MobileFooter
