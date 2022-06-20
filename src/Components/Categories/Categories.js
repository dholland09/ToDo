import React, {useState, useEffect} from 'react'//useState for the categories hook and useEffect to automate the component to retrieve data
import { Container } from "react-bootstrap"
//npm install axios - package that retrieves data from the api and makes other requests (Post, Put, Delete)
import axios from 'axios'
import SingleCategory from './SingleCategory';
import {useAuth} from '../../Contexts/AuthContext'
import CatCreate from './CatCreate';

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const {currentUser} = useAuth();
    const [showCreate, setShowCreate] = useState(false);
    const getCategories = () => {

        axios.get(`https://localhost:7197/api/Categories`).then(response => {
      console.log(response)
        setCategories(response.data);      
        })
      }

      useEffect(() => {
        getCategories()
      }, [])



  return (
    <section className='categories'>
        <article className='bg-dark p-3 text-white'>
            <h1 className='text-center'>Categories</h1>
        </article>

      {/* Create UI */}
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
          <div className='bg-dark p-2 mb-3 text-center'>
            {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className='btn btn-warning'>Cancel</button>
              <CatCreate 
                getCategories={getCategories}
                setShowCreate={setShowCreate}/>
            </> :
            <button className='btn btn-light' onClick={() => setShowCreate(true)}>Create Category</button>}
            </div>
            }

      {/* End Create UI */}

        <Container className='p-2'>
          <table className='table bg-info table-dark mt-3 mb-3 text-center'>
            <thead className='table-secondary text-uppercase'>
              <tr>
                <th>Name</th>
                <th>Description</th>
                {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
                  <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {categories.map(x =>
                <SingleCategory
                key={x.categoryId}
                category={x}
                getCategories={getCategories} />
                )}
            </tbody>
          </table>
        </Container>


    </section>
  )
}
