import React ,{useState} from 'react';
import UserTable from './Tables/UserTable';
import AddUser from './Forms/AddUser';

import './App.css';

const App = () =>
{

  const userdata=[
    {id:1,name:'priyam',username:'psrimany'},
    {id:1,name:'subhamoy',username:'sbhaumik'},
    {id:1,name:'dillip',username:'dsahoo'}
  ]

const [users, setusers]= useState(userdata);



  return(
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add user</h2>
          <AddUser />
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable user={users} />
        </div>
      </div>
    </div>
  )
}

export default App
