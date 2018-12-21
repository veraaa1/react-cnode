import React, { Component } from 'react';
import Header from './components/Header/Header'
import './components/static/global.css'
import Home from './components/Home/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import Main from './components/Main/Main'
class App extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <Router>
      <div style={{backgroundColor:'#e1e1e1'}}>
        <Header/>
        <Main>
          <Home/>
        </Main>
      </div>
      </Router>
    );
  }
}

export default App;
// const Wrap = styled.div`
// width:660px;
// border-radius:8px;
// background-color:#fff;

// `