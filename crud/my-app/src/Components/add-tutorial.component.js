import React, { Component } from 'react';
import services from '../Services/tutorial.service';

export default class AddTutorialPoint extends Component
{
    constructor(props)
    {
        super(props);
        this.state=
        {
            id:null,
            userId: '',
            name:'',
            responseArr: [],
            isAdded: false
        }
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.AddItem = this.AddItem.bind(this);
        this.NameChange = this.NameChange.bind(this);
        this.UserIdChange = this.UserIdChange.bind(this);
    }
    NameChange(e)
    {
      const newName = e.target.value;
      this.setState({name: newName});
      console.log(this.state.name)
    }

    UserIdChange(event)
    {
      this.setState({userId: event.target.value});
      console.log(this.state.userId);
    }

    AddItem(e)
    {
      e.preventDefault();
      var data= 
      {
        name: this.state.name,
        userId: this.state.userId
      }

      services.create(data)
     .then(res =>{
       console.log("Post done:"+res.data);
       this.retrieveTutorials();
       this.setState({isAdded: true});
     })
     .catch(e =>{
       console.log(e);
     });
    }
    retrieveTutorials()
    {
       services.getAll()
      .then(response => {
        this.setState({
            responseArr: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
    
    
    componentDidMount()
    {
      this.retrieveTutorials();
    }
    
    render()
    {
      return(
    
        <div>Hello


<ul>{this.state.responseArr.map((item,i) => <li key={i}><span>{item.name}</span><span>{item.userId}</span><a href="#" onClick={this.DeleteItem}>Delete</a><a href="#" onClick={this.EditItem}>Edit</a></li>)}
      </ul>
      
      {this.state.isAdded?
      
     (<div>Item added successfully</div>):
     (<form ><div>Name: <input type="text" value={this.state.name} onChange={this.NameChange}></input></div>
      <div>UserId: <input type="text" value={this.state.userId} onChange={this.UserIdChange}></input></div>
      <div><button onClick={this.AddItem}>Add Item</button></div></form>)
      }
      
      </div>
        );
    }
    
}

