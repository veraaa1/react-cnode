import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Axios from 'axios';
class NewTopic extends Component {
    state={
        title:'',
        topic:''
    }
    render() {
        const {title,topic}=this.state
        return (
            <Wrap>
                <h3><Link to="/">主页</Link>/发布话题</h3>
                <input type="text" id="title" placeholder="enter your title" value={title} onChange={this.onChange}/>
                <input type="text" id="content" value={topic} onChange={this.onChangeCon}/>
                <button className="submit" onClick={this.addTopic}>提交</button>
            </Wrap>
        );
    }
    onChange=(event)=>{
            this.setState({
                title:event.target.value
            })
        
   
    }
    onChangeCon=(event)=>{
        this.setState({
            topic:event.target.value
        })
    }
    addTopic=()=>{
        const {title,topic}=this.state
        const token = sessionStorage.token
        console.log({
            accesstoken:token,title:title,tab:'dev',content:topic
        });
        
        if(title.trim()&&topic.trim()){
            Axios.post(`https://cnodejs.org/api/v1/topics`,{
                accesstoken:token,title:title,tab:'dev',content:topic
            }).then(res=>{
                this.setState({
                    title:'',
                    topic:''
                })
            })
            
        }else{
            alert('您的输入有误')
        }
    }
}

export default NewTopic;
const Wrap = styled.div`
width:910px;
background-color:#fff;
margin-right:10px;
border-radius:5px 5px 0 0 ;
h3{
    line-height:30px;
}
>h3>a{
    display: inline-block;
    padding:0 10px;
}
#title{
    display: block;
    width:300px;
    outline:none;
    line-height:30px;
    border:1px solid #ccc;
   border-radius:5px;
   margin-left:15px;
   text-indent:15px;
    
}
#content{
    display: block;
    margin-top:20px;
    width:600px;
    outline:none;
    height:200px;
    border:1px solid #ccc;
    border-radius:5px;
    margin-left:15px;
    line-height:30px;
    
}
button{
    outline:none;
    background-color:#80bd01;
    line-height:30px;
    width:60px;
    text-align:center;
    color: #fff;
    border-radius:5px;
    border:none;
    margin-left:15px;
    margin-top:15px;
}
`