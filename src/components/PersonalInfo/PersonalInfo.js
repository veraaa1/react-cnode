import React, { Component } from 'react';
import styled from 'styled-components'
import Axios from 'axios';
import NewTopicEnter from '../NewTopicEnter/NewTopicEnter';
class PersonalInfo extends Component {
    state={
        token:'',
        userInfo:null
    }
    componentDidMount() {
        if(sessionStorage.loginname){
            this.setState({
                userInfo:{
                    loginname:sessionStorage.loginname,
                    avatar_url:sessionStorage.avatar_url
                }
            })
        }else{
            console.log(1111);
            
            this.setState({
                userInfo:null
            }) 
        }
        
    }
    
    render() {
        const {token,userInfo}=this.state
        console.log(userInfo);
        
        return (
            <Wrap>
                {/* h5 的本地存储:将本地信息暂时存储到浏览器中 
                当用户登录成功的时候,将用户的信息基本信息存储到浏览器中(密码可不行)
                localStorage(无时间限制)
                sessionStorage(关闭浏览器就没了)
                */}
                <h3>个人信息</h3>
                
                   {
                       userInfo? <div>
                           <Person><img src={userInfo.avatar_url} alt=""/><span className="username">{userInfo.loginname}</span>
                       <p>积分:0</p>
                       <p>“ 这家伙很懒，什么个性签名都没有留下。 ”</p>
                       <button className="logout" onClick={this.logout}>退出</button>
                       </Person>
                       <NewTopicEnter/>
                   </div>
                       :<Person><input type="text" name="" id="" value={token} onChange={this.handleChange} />
                       <button onClick={this.login} className="login">登录</button></Person>
                   }
            </Wrap>
        );
    }
    handleChange=(event)=>{
        this.setState({
            token:event.target.value
        })
    }
    login=()=>{
    const {token}=this.state
    if(token.trim()){
        const url = 'https://cnodejs.org/api/v1/accesstoken'
        Axios.post(url,{accesstoken:token}).then(res=>{
            sessionStorage.loginname=res.data.loginname
            sessionStorage.avatar_url=res.data.avatar_url
            sessionStorage.id = res.data.id
            sessionStorage.token = token
            console.log(res.data);
            
            this.setState({
                userInfo:{
                    loginname:res.data.loginname,
                    avatar_url:res.data.avatar_url
                }
            })
        }).catch(res=>{
            alert('不对呀');
            
        })
    }
    }
    logout=()=>{
        sessionStorage.clear()
        this.setState({
            userInfo:null,
        })
    }
}

export default PersonalInfo;
const Wrap=styled.div`
width:290px;
background-color: #fff;
border-radius:5px 5px 0 0;
height: 200px;
h3{
    width:100%;
    line-height:20px;
    padding:10px;
    background-color:#f6f6f6;
    border-radius:5px 5px 0 0;
   
}
`
const Person = styled.div`
width:90%;
margin:0 auto;
border-radius:3px;
.login{
    display: inline-block;
    padding:0 5px;
    border-radius:0 3px 3px 0;
    background-color:#80bd01;
    text-align:center;
    color: #fff;
    border:none;
    line-height:30px;
}
.logout{
    display: inline-block;
    padding:0 5px;
    border-radius:3px;
    background-color:#80bd01;
    text-align:center;
    color: #fff;
    border:none;
    line-height:30px;
}
.username{
    font-size:20px;
    padding-left:15px;
    line-height:50px;
}
>input{
    outline:none;
    border:1px solid #ccc;
    height:30px;
}
>img{
    width:50px;
    height:50px;
    border-radius:50%;
}
>p{
    font-size:12px;
    font-style:italic;
    margin-bottom:0;
    line-height:30px;
}
`