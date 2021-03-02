import NextLink from 'next/link'
import styles from './Header.module.css'
import { bool, func } from 'prop-types'
import { StyledBurger } from './Burger.module.js'
import React, { useState } from 'react'
const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}
Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}

export default Burger
