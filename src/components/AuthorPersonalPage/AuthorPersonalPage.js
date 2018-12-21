import React, { Component } from 'react';
import styled from 'styled-components'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import Axios from 'axios';
class AuthorPersonalPage extends Component {
    state={
        detail:null
    }
    componentDidMount() {
        const location = this.props.location.pathname
        console.log(location);
        Axios.get(`https://cnodejs.org/api/v1${location}`).then(res=>{
            console.log(res.data.data);
            
            this.setState({
                detail:res.data.data
            })
        })
    }
    render() {
        const {detail}=this.state
        return (
            <Content>
                <Wrap>

                    {
                      detail? <div>
                          <div className="detailinfo"><a href="#">主页</a></div>
                        <img src={detail.avatar_url} alt=""/>
                        <span>{detail.loginname}</span>
                        <p>{detail.create_at}</p>
                      </div> :<div></div>
                    }
                    
                </Wrap>
                <AuthorInfo/>
            </Content>
        );
    }
}

export default AuthorPersonalPage;
const Wrap = styled.div`
width:910px;
background-color:#fff;
margin-right:10px;
border-radius:5px 5px 0 0 ;
.detailinfo{
    width:100%;
    background-color:#eee;
}
>div>img{
    width:50px;
    height:50px;
}
`
const Content=styled.div`
width:90%;
margin:0 auto;
margin-top:15px;
display:flex;
`