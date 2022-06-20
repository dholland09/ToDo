import React from 'react'
//Step 1 
import { useAuth } from '../../Contexts/AuthContext'//This gives access to currentUser, login, or logout...rememebr to create the hook that accesses any of these three...see below.
import { Container, Card } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

export default function Login() {
    //Step 2
    const {login} = useAuth();
    const navigate = useNavigate();

    async function handleAuth(){
        //Await keyword to pause any more code from executing until we get a response back from Firebase
        await login();

        //return the user to a specific location using useNavigate hook from react-router-dom
        return navigate('/')
    }


  return (
    <div className='login'>
        <article className='bg-dark mb-5 p-5 text-dark'>
            <h1 className='text-center'>Welcome to To Do App!</h1>
        </article>
         <Container>
            <Card className="m-2 border-dark text-center">
                <Card.Header className="bg-dark text-white">
                    <h2>Login for full functionality</h2>
                </Card.Header>
                <Card.Body>
        <button className='btn btn-secondary' onClick={() => handleAuth()}>Login w/ GitHub</button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}
