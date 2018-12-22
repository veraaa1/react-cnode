import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Home from '../Home/Home';
import Post from '../Post/Post';
import styled from 'styled-components'
import PersonalInfo from '../PersonalInfo/PersonalInfo'
import Login from '../Login/Login';
import AuthorPersonalPage from '../AuthorPersonalPage/AuthorPersonalPage'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import NewTopic from '../NewTopic/NewTopic';
import TopicAttention from '../TopicAttention/TopicAttention';
class Main extends Component {
    render() {
        return (
            <Wrap>
                <Switch>
                    <Route component={Login} path='/login'/>
                    <Route component={NewTopic} path='/topic/create'/>
                    <Route component={Post} path='/topic/:id'/>
                    <Route component={AuthorPersonalPage} path='/user/:authorname'/>
                   
                    <Route component={Home} path='/'/> 
               </Switch>
               <Switch>
                    <Route component={AuthorInfo} path='/user/:authorname'/>
                    <Route component={TopicAttention} path='/topic/create'/>
                    <Route component={AuthorInfo} path='/topic/:id'/>
                    <Route component={PersonalInfo} path='/'/>
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