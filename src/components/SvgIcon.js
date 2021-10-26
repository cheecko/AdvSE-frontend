import { SvgIcon } from '@mui/material';

const WishlistIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path fill="none" stroke="#000000" d="M11 3.12138686s5.3208567-5.38941603 9.2647991 1.01212628C24.2087415 10.5350555 11 20 11 20S-2.2087415 10.5350555 1.7352009 4.13351314C5.6791433-2.26802917 11 3.12138686 11 3.12138686z"></path>
    </SvgIcon>
  )
}

const CartIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <g fill="none" stroke="#000000">
        <path d="M1.23976986 4.195l-.92740985 16.21H19.48764l-.9274099-16.21H1.23976986z"></path>
        <path d="M5.5 6.9V5.23467742C5.5 2.89592966 7.38040405 1 9.7 1c2.3195959 0 4.2 1.89592966 4.2 4.23467742V6.9"></path>
      </g>
    </SvgIcon>
  )
}

export {WishlistIcon, CartIcon}