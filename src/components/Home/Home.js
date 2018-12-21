import React, { Component } from 'react';
import styled from 'styled-components'
import Axios from 'axios';
import {Route,NavLink} from 'react-router-dom'
import { Skeleton } from 'antd'
import Topic from '../Topics/Topic';
class Home extends Component {
    render() {
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
        const navLi = navArr.map(e=><li key={e.type}><NavLink to={`/${e.type==='all'?'':e.type}`} onClick={
            this.update
          } exact={e.type==='all'?true:false}>{e.txt}</NavLink></li>)      
        return (
            <Wrap>
                <ul className="nav-list">
                    {navLi}
                </ul>
                  <Route component={Topic} path="/" exact/>
                  <Route component={Topic} path="/:tab"/>
            </Wrap>
        );
    }
    update=()=>{
        this.forceupdate()
    }
}
export default Home;
const Wrap = styled.div`
width:660px;
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