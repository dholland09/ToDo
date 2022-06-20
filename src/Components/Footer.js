import React from 'react'
import Logout from './Auth/Logout'
//Logout will be conditionally rendered if the user is logged in...so we need user info
import { useAuth } from '../Contexts/AuthContext'

export default function Footer() {
    const {currentUser} = useAuth();
  return (
    <>
        {currentUser &&
            <Logout />
        }
        <footer className='text-center text-white bg-dark p-4'>
            <strong>&copy; {new Date().getFullYear()} All Rights Reserved</strong>
        </footer>
    </>
  )
}
