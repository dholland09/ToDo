import React from 'react'
import {Formik, Form, Field } from 'formik'//This will produce the form for creating/editing a category.
import catSchema from '../../Utilities/validationSchemas'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){
            //create mode
            const catToCreate = values;//assemblle temp object to send in our request

            //send the object in POST request to the API
            axios.post(`https://localhost:7197/api/Categories`, catToCreate).then(() => {
                props.setShowCreate(false)//this will close the form...passed as a prop from categories
                props.getCategories()//Will make a GET request to the API...passed as a prop from categories
            })
        }
        else{
            //edit mode
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,//take the values object and destructure to pull just the categoryName
                catDesc: values.catDesc
            }
            axios.put(`https://localhost:7197/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.getCategories();
                props.setShowEdit(false);
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                //Below is a ternary operator that makes our form behave differently based on whether we have a prop called category. (ie Editing a category)
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>
                {({errors, touched}) => (
                    //Form will go here
                    <Form id='catForm' className='row text-center m-auto'>
                        <div className='form-group m-1 p-1'>
                            <Field name='catName' className='form-control' placeholder='Name' />
                            {errors.catName  && touched.catName ?
                                <div className='text-danger'>{errors.catName}</div>
                            : null}
                        </div>
                        <div className='form-group m-1 p-1'>
                            <Field name='catDesc' className='form-control' placeholder='Description' />
                            {errors.catDesc  && touched.catDesc ?
                                <div className='text-danger'>{errors.catDesc}</div>
                            : null}
                        </div>
                        <div className='form-group m-1'>
                            <button type='submit' className='btn btn-light'>Submit Category to API</button>
                        </div>
                    </Form>
                )}
            </Formik>
    </div>
  )
}
