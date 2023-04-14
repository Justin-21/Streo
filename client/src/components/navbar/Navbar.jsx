import { ArrowDropDown, Notifications, Search } from '@mui/icons-material'
import { useContext, useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Streo.png'
import { Button } from '@mui/material'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className='container'>
        <div className='left'>
          <Link to='/'>
            <img
              src={Logo}
            />
          </Link>
          <Link to='/series' className='link'>
            <span className='navbarmainLinks'>Series</span>
          </Link><Link to='/anime' className='link'>
            <span className='navbarmainLinks'>Anime</span>
          </Link>
          <Link to='/tvshows' className='link'>
            <span className='navbarmainLinks'>TV Shows</span>
          </Link>
          <Link to='/movies' className='link'>
            <span className='navbarmainLinks'>Movies</span>
          </Link>
        </div>
        <div className='right'>
          {/* <span onClick={() => dispatch(logout())}>Logout</span> */}
          <Button
            variant='contained'
            color='primary'
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
