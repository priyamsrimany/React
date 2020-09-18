import React, {ReactDOM, useState,useEffect,Alert} from 'react';
import {InputGroup} from "react-dom";



 function Priyam()
{
    //const [employee, setemployee]= useState({FirstName: '', LastName: '' }); 
    //const data= {FName:employee.FName, LastName:employee.LastName};
    const [FirstName, SetFName]= useState( '' ); 
    const [LastName, SetLName]= useState('' ); 
    useEffect(() => 
    {
    //SetUser('Josh Albert');
    //SetEmail('Please enter email id');
    });
    
    //const [show, setShow] = useState(true);
const handleSubmit= (e) =>
{
  e.preventDefault();
  if(FirstName!==null && FirstName!=='' && LastName!==null && LastName!=='')
  {
    const obj =
    {
      firstName: FirstName,
      lastName: LastName
    }
    console.log("FirstName"+obj.firstName);
  }
}

const ChangeFName =(e) =>
{
  e.persist();
 
  SetFName(e.target.value);
  console.log(FirstName);
 // setemployee({...employee,[e.target.name]:e.target.value})
}

const ChangeLName =(e) =>
{
  e.persist();
  SetLName(e.target.value);
  console.log(LastName);
 // setemployee({...employee,[e.target.name]:e.target.value})
}

  return (
      <div>
           <form onSubmit={handleSubmit}>
      <div>
      
        <label>First Name</label>
        <input type="text" name="FirstName" id="FirstName" required  value={FirstName} onChange={ChangeFName}/>
     
        <label>Last Name</label>
        <input type="text" name="LastName" id="LastName" required value={LastName} onChange={ChangeLName}/>
      </div>
      <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Priyam;