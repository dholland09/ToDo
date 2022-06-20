import React from 'react'
import {Modal} from 'react-bootstrap'
import TodoForm from './TodoForm'

export default function TodoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header className='bg-light' closeButton>
                <h3>Editing: {props.toDo.name}</h3>
            </Modal.Header>
            <Modal.Body>
                <TodoForm
                    toDo={props.toDo}
                    setShowEdit={props.setShowEdit}
                    getTodos={props.getTodos} />
            </Modal.Body>
        </Modal>
  )
}
