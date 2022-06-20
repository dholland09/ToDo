import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { todoSchema } from "../../Utilities/validationSchemas";
import axios from "axios";
export default function TodoForm(props) {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`https://localhost:7197/api/Categories`).then(response => setCategories(response.data))
  }

  const handleSubmit = (values) => {
    console.log(values)
    if(!props.toDo){
      //create code
      const todoToCreate = values;

      axios.post(`https://localhost:7197/api/ToDoes`, todoToCreate).then(() => {
        props.getTodos()
        props.setShowCreate(false)
      })
    }
    else{
      //edit code
      const todoToEdit ={
      toDoId: props.toDo.toDoId,
      name: values.name,
      done: values.done,
      categoryId: values.categoryId
      }

      axios.put(`https://localhost:7197/api/ToDoes/${props.toDo.toDoId}`, todoToEdit).then(() => {
      props.getTodos()
      props.setShowEdit(false)
    })

    }
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <Formik
      initialValues={{
        name: props.toDo ? props.toDo.name : '',
        done: props.toDo ? props.toDo.done : '',
        categoryId: props.toDo ? props.toDo.categoryId : '',
      }}
      validationSchema={todoSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => (
        <Form id="todoForm">
          <div className="form-group m-3">
            <Field name="name" className="form-control" placeholder="Name" />
            {errors.name && touched.name ? (
              <div className="text-danger">{errors.name}</div>
            ) : null}
          </div>

          <div className="form-group m-3">
            <Field name="done" className="form-control" placeholder="Done" />
            {errors.done && touched.done ? (
              <div className="text-danger">{errors.done}</div>
            ) : null}
          </div>

          <div className="form-group m-3">
            <Field as="select" name="categoryId" className="form-control">
              <option value="" disabled>
                [--Please choose--]
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.catName}
                </option>
              ))}
            </Field>
          </div>
          <div className="form-group m-3">
            <button type="submit" className="btn btn-light m-3">
              Submit To Do
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
