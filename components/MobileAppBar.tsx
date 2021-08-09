import { useRef, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Toolbar } from '@material-ui/core/'

import SearchIcon from '@material-ui/icons/Search'
import { useOnClickOutside } from '../hooks'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import HomeIcon from '@material-ui/icons/Home'

import { useStyles } from '../constants'
import LiveDataSearch from './LiveDataSearch'

const MobileAppBar = () => {
  const classes = useStyles()
  const [showSearchBar, setShowSearchBar] = useState(false)
  const node = useRef()
  useOnClickOutside(node, () => setShowSearchBar(false))
  const { back } = useRouter()

  return (
    <AppBar position="fixed" className={classes.appBar} ref={node}>
      <Toolbar>
        {!showSearchBar ? (
          <>
            <ArrowBackIcon
              className={classes.footerIcons}
              fontSize="large"
              onClick={() => back()}
            />
            <NextLink href="/" as="/">
              <HomeIcon className={classes.footerIcons} fontSize="large" />
            </NextLink>

            <SearchIcon
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
export default MobileAppBar
