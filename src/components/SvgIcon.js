import { SvgIcon } from '@mui/material'

const WishlistIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox='0 0 22 22'>
      <path fill={props.variant === 'filled' ? 'black' : 'none'} stroke="#000000" d="M11 3.12138686s5.3208567-5.38941603 9.2647991 1.01212628C24.2087415 10.5350555 11 20 11 20S-2.2087415 10.5350555 1.7352009 4.13351314C5.6791433-2.26802917 11 3.12138686 11 3.12138686z"></path>
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

const MenuIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox='0 0 32 32'>
      <path d="M5.5 22.003C5.5 21.5888 5.83579 21.253 6.25 21.253H25.75C26.1642 21.253 26.5 21.5888 26.5 22.003C26.5 22.4172 26.1642 22.753 25.75 22.753H6.25C5.83579 22.753 5.5 22.4172 5.5 22.003Z"></path>
      <path d="M5.5 16.003C5.5 15.5888 5.83579 15.253 6.25 15.253H25.75C26.1642 15.253 26.5 15.5888 26.5 16.003C26.5 16.4172 26.1642 16.753 25.75 16.753H6.25C5.83579 16.753 5.5 16.4172 5.5 16.003Z"></path>
      <path d="M5.5 10.003C5.5 9.58878 5.83579 9.253 6.25 9.253H25.75C26.1642 9.253 26.5 9.58878 26.5 10.003C26.5 10.4172 26.1642 10.753 25.75 10.753H6.25C5.83579 10.753 5.5 10.4172 5.5 10.003Z"></path>
    </SvgIcon>
  )
}

const LockIcon = (props) => {
  return (
    <SvgIcon {...props} >
      <path d="M2.25 24.49C1.01 24.49 0 23.48 0 22.24V11.74C0 10.5 1.01 9.49 2.25 9.49H3V6.49C3 3.18 5.69.49 9 .49 12.31.49 15 3.18 15 6.49V9.49H15.75C16.99 9.49 18 10.5 18 11.74V22.24C18 23.48 16.99 24.49 15.75 24.49H2.25ZM2.25 10.99C1.84 10.99 1.5 11.32 1.5 11.74V22.24C1.5 22.65 1.84 22.99 2.25 22.99H15.75C16.16 22.99 16.5 22.65 16.5 22.24V11.74C16.5 11.32 16.16 10.99 15.75 10.99H2.25ZM13.5 9.49V6.49C13.5 4.01 11.48 1.99 9 1.99 6.52 1.99 4.5 4.01 4.5 6.49V9.49H13.5Z" fill="black"></path>
      <path d="M9 17.368C8.38 17.368 7.88 16.858 7.88 16.238 7.88 15.618 8.38 15.118 9 15.118 9.3 15.118 9.59 15.228 9.8 15.448 10.01 15.658 10.13 15.938 10.13 16.238 10.13 16.858 9.62 17.368 9 17.368Z" fill="black"></path>
    </SvgIcon>
  )
}

export {WishlistIcon, CartIcon, MenuIcon, LockIcon}