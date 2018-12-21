import React, { Component } from 'react';
import Header from './components/Header/Header'
import './components/static/global.css'
import Home from './components/Home/Home';
import styled from 'styled-components'
import { Pagination } from 'antd'
import { BrowserRouter as Router,Route,Switch,NavLink} from 'react-router-dom';
class App extends Component {
  state={
    type:'all',
    page:1
  }
  componentDidMount() {
    const{type}=this.state
    console.log(type);
    
  }
  
  render() {
    const{type,page}=this.state
    console.log(type);
    
    const navArr = [{
      type:'all',
      txt:'全部',
      num:83*40+10
  },{
      type:'good',
      txt:'精华',
      num:16*40+36
  },{
      type:'share',
      txt:'分享',
      num:34*40+4
  },{
      type:'ask',
      txt:'问答',
      num:49*40+6
  },{
      type:'job',
      txt:'招聘',
      num:16*40+34
  }]
  const navLi = navArr.map(e=><li key={e.type}><NavLink to={`/tab=${e.type}&page=${page}`} onClick={()=>{
    this.changeType(e.type)
  }}>{e.txt}</NavLink></li>)
    return (
      <Router>
      <div style={{backgroundColor:'#e1e1e1'}}>
        <Header/>
        <Main>
        <Wrap>
                <ul className="nav-list">
                    {navLi}
                </ul>
            </Wrap>
         
            {/* <Route component={Good} path='/tab=good'/>
            <Route component={Share} path='/tab=share'/>
            <Route component={Ask} path='/tab=ask'/>
            <Route component={Job} path='/tab=job'/> */}
            <Switch>
            <Route component={Home} path={`/tab=:type&page=:postId`}/>
            <Route component={Home} path={`/`}/>
            </Switch>
            {/* <Pagination current={page} onChange={this.onChange} total={(navArr[navArr.findIndex(e=>e.type===type)].num)} pageSize={40} /> */}
        </Main>
        
      </div>
      </Router>
    );
  }
  changeType=(type)=>{
    this.setState({
      type:type
    })
    this.forceupdate()
  }
  onChange = (page) => {
    this.setState({
        page: page,
    })
    this.forceupdate()
  }
}

export default App;
const Main = styled.div`
width:960px;
margin:0 auto;
margin-top:15px;

`
const Wrap = styled.div`
width:660px;
border-radius:8px;
background-color:#fff;
.nav-list{
    list-style:none;
    width:100%;
    display:flex;
    justify-content:space-around;
    background-color: #f6f6f6;
    border-radius:3px 3px 0 0;
    padding:10px;
    margin-bottom:0
}
.nav-list>li>a{
    text-decoration:none;
    color: #80bd01;
    padding:2px 5px;
    border-radius:3px;
    
}
.nav-list>li>.active{
    background-color:#80bd01;
    color: #fff;
}
`