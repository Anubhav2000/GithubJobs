import SearchBar from './Components/SearchBar/SearchBar';
import { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import JobDescription from './Components/JobDescription/JobDescription';
const axios = require('axios');
class App extends Component {


  render(){
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
        </header>
        <Route exact path="/" component={() => <SearchBar></SearchBar>}></Route>
        <Route exact path="/jobDescription/:id" component={(props) => <JobDescription {...props}></JobDescription>}></Route>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
