import axios from 'axios'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.scss'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const history = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()

  const handleStart = () => {
    setEmail(emailRef.current.value)
  }
  const handleFinish = async (e) => {
    e.preventDefault()
    setPassword(passwordRef.current.value)
    setUsername(usernameRef.current.value)
    try {
      await axios.post('auth/register', { email, username, password })
      history.push('/login')
    } catch (err) {}
  }
  return (
    <div className='register'>
      {/* <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
        </div>
      </div> */}
      <div className='container'>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          If You have an account, please{' '}
          <button className='loginButton'>
            <Link className='link' to='/login'>
              Sign In
            </Link>{' '}
          </button>
        </p>
        {!email ? (
          <div className='input'>
            <input type='email' placeholder='email address' ref={emailRef} />
            <button className='registerButton' onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className='input'>
            <input type='username' placeholder='username' ref={usernameRef} />
            <input type='password' placeholder='password' ref={passwordRef} />
            <button className='registerButton' onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
