import React, {useState, useEffect} from 'react'
import axios from 'axios'



export default function FilterCat(props) {
    //We need to access and store categories from the API for this component to work
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7197/api/Categories`).then(response => {
              setCategories(response.data);
            })
    }, []);


  return (
    <div className='text-center mt-5'>
        <button id='catLink' onClick={() => props.setFilter(0)} className='btn btn-outline-light bg-dark m-1'>
            All
        </button>
        {/* Below we map all of the categories to a button that will be used to filter resources on that category */}
        {categories.map(cat =>
            <button id='catLink' key={cat.categoryId} className='btn btn-outline-light bg-dark m-1' onClick={() => props.setFilter(Number(cat.categoryId))}>
                {cat.catName}
            </button>    
        )}
    </div>
  )
}