import React from 'react';

const UserTable = props =>
{
    return(
        <div>
    {
        props.user.length >0 ?(
            props.user.map(usr => (
            <tr key={usr.id}>
                <td>{usr.name}</td>
                <td>{usr.username}</td>
                <td>
                  <button className="button muted-button">Edit</button>
                  <button className="button muted-button">Delete</button>
                </td>
              </tr>
              )
        )):
        (
            <tr>
          <td colSpan={3}>No users</td>
        </tr>
        )
    
    }
    </div>
    )
}
export default UserTable;