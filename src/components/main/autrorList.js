import React from 'react';
import {Link} from "react-router-dom";

export default function AuthorList(props) {
  return (
    <div className="photogalery">
      {
        props.users.length?<div className="author-list">
        <h1>List of photographers</h1>
          <ul>
            {
              props.users.map(el=>{
              return (
              <li key={el.id}>
                <Link to={`/photographer/${el.username}/`} >
                  {el.name}, 
                  pen name - {el.username}, 
                  city - {el.address.city}
                </Link>
                
              </li>);
              })
            }
          </ul>
        </div>:<div className='noItems'>No users to display</div>
      }
    </div>
  )
}