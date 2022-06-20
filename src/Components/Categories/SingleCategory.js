import React, {useState} from "react";
import { useAuth } from "../../Contexts/AuthContext";

/* Font Awesome Icons
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import CatEdit from './CatEdit'
import axios from "axios";

library.add(fas);

export default function SingleCategory(props) {
const {currentUser} = useAuth();
const [showEdit, setShowEdit] = useState(false);

const deleteCat = (id) => {
  if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)){
    axios.delete(`https://localhost:7197/api/Categories/${id}`).then(() => {props.getCategories()})
  }
}

  return (
    <tr>
      <td>{props.category.catName}</td>
      <td>{props.category.catDesc}</td>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
      <td>
        <button className="m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
        <FontAwesomeIcon icon={['fas', 'edit']} />
        </button>
        <button className="m-1 rounded" id="editLink" onClick={() => deleteCat(props.category.categoryId)}>
        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
        </button>

        {showEdit &&
          //Call CatEdit to display the modal with the form
          <CatEdit
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            getCategories={props.getCategories}
            category={props.category} />
        }

      </td>
      }
    </tr>
  );
}
