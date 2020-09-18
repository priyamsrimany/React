import React,{Component} from 'react';
import './App.css';
import Home from './Home'
const list = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
]
const itemarr= list.map((item)=><li>{item.id}</li>);
const taketry =
[
  {name:'hello',no:1},
  {name:'hi', no:'2'}
]

class About extends React.Component
{
  render()
  {
    return(
      <div>About</div>
    );
  }
}

class App extends  React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
       header: "Header from state...",
       content: "Content from state...",
       data:[],
       newdata:"old valuey"
    }
    this.addItem= this.addItem.bind(this);
    this.updatestate = this.updatestate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 }

 addItem()
 {
  var item = "setState..."
  var myArray = this.state.data.slice();
  myArray.push(item);
  if(myArray.length<4)
  {
  this.setState({data: myArray})
  }
 }

 updatestate(e)
 {
    this.setState({newdata: e.target.value});
 }
 handleSubmit(event) {
   try
   {
  alert('A name was submitted: ' + this.state.header);
  event.preventDefault();
   }
   catch(error)
   {

   }
      
}


  render(){
  return (
    <div className="App">
      My app
     {itemarr}
      <div>{this.state.header}</div>
     <Home name={this.state.header} data={this.state.newdata} onchange={this.updatestate}/>
     <About/>

     <br/>
     <div>
     <button onClick={this.addItem}>Click</button>
     <h4>State Array: {this.state.data}</h4>


     <div className="formSubmit">

       <form onSubmit={this.handleSubmit}>
      <label>Name: </label>
      <input type="text" value={this.state.newdata}></input>
      <input type="submit" value="submit"></input>
       </form>
     </div>
   </div>
    </div>
  );
  }
}



export default App;
