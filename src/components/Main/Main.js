import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from '../Home/Home';
import Post from '../Post/Post';
import styled from 'styled-components'
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import Login from '../Login/Login';
class Main extends Component {
    render() {
        return (
            <Wrap>
                <Switch>
                    <Route component={Login} path='/login'/>
                    <Route component={Post} path='/topic/:id'/>
                    <Route component={Home} path='/'/> 
               </Switch>
               <Switch>
               <Route component={PersonalInfo} path='/'/>
               {/* <PersonalInfo/> */}
               </Switch>
            </Wrap>
        );
    }
}

export default Main;
const Wrap = styled.div`
width:90%;
margin:0 auto;
margin-top:15px;
display:flex;
`