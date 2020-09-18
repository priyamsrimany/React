import React,{Component} from 'react';
import './App.css';


class Home extends React.Component
{
    constructor(props) {
        super(props);
       }
  render()
  {
    return(
      <div>Home {this.props.name} 
      <div>{this.props.data}</div>
      
      <input type="text" value={this.props.data} onChange= {this.props.onchange}/>
      
      </div>
     
    );
  }
}
export default Home;
