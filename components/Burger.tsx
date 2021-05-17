import { bool, func } from 'prop-types'

import { StyledBurger } from './Burger.module'

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger role="button" open={open} onClick={() => setOpen(!open)}>
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
