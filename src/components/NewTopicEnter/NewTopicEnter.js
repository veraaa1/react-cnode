import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
class NewTopicEnter extends Component {
    render() {
        return (
            <Out>
                <Link to='/topic/create'>发布话题</Link>
            </Out>
        );
    }
}

export default NewTopicEnter;
const Out = styled.div`
width:290px;
background-color: #fff;
border-radius:5px 5px 5px 5px;
margin-top:15px;
padding:20px;
a{
    display: inline-block;
    padding:0 5px;
    border-radius:0 3px 3px 0;
    background-color:#80bd01;
    text-align:center;
    color: #fff;
    border:none;
    line-height:30px;
}
`