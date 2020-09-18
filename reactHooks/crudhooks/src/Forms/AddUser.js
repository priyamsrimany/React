import React, { useState } from 'react'

const AddUser = () => {
	const newObj =	{id: null, name: '', username: ''};
	const [ user ,setUser ] = useState(newObj);
const AddUserItem =()=>
{
	alert();
}
const eventHands = event =>
{
	if(event.target.name == 'name')
	{
		setUser.name(event.target.value)
	}/*
	else{
		setUser.username(e.target.value)
	}*/
}

	return (
		<form onSubmit={AddUserItem}>
			<label>Name</label>
			<input type="text" name="name" value={user.name} onChange={eventHands} />
			<label>Username</label>
			<input type="text" name="username" value={user.username} onChange={eventHands} />
			<button>Add new user</button>
		</form>
	)
}

export default AddUser
