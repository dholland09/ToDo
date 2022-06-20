import React, {useState} from 'react'

import axios from 'axios'
import {useAuth} from '../../Contexts/AuthContext'

//fontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import TodoEdit from './TodoEdit'

library.add(fas);


export default function SingleTodo(props) {

  const{currentUser} = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  const deleteTodo = (id) => {

    if(window.confirm(`Are you sure you want to delete ${props.toDo.name}?`)){
      axios.delete(`https://localhost:7197/api/ToDoes/${id}`).then(() => {props.getTodos()})
    }

  }

  return (
    <>
    <tr>
      <td>{props.toDo.name}</td>
      <td>{props.toDo.done}</td>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
      <td>
        <button id='editLink' onClick={() => setShowEdit(true)}>
        <FontAwesomeIcon icon={['fas', 'edit']}/>
      </button>    
      <button id='deleteLink' onClick={() => deleteTodo(props.toDo.toDoId)}>
        <FontAwesomeIcon icon={['fas', 'trash-alt']}/>
     </button> 

     {showEdit &&
     <TodoEdit
        setShowEdit={setShowEdit}
        showEdit={showEdit}
        getTodos={props.getTodos}
        toDo={props.toDo} />
     }   
      </td>
      }
    </tr>
   
  </>
  )
}
  
  
  
 

     




// export default function SingleTodo(props) {
//   return (
//     <div className='singleTodo col-md-5 m-4'>
//         <h3>{props.toDo.name}</h3>

//     </div>
//   )
// }
