import React, { Component } from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Axios from 'axios';
class AuthorInfo extends Component {
    state={
        AuthorInfo:null,
        lookDetail:false
    }
    componentDidMount() {
      const {match} =this.props
      const param= match?match.params:null
        if(param!==null){
            if(param.id){
                const id = param.id
                const url= ` https://cnodejs.org/api/v1/topic/${id}`
            Axios.get(url).then(res=>{
                this.setState({
                    AuthorInfo:res.data.data.author
                })
            })
            }
            else if(param.authorname!==''){
                const username =param.authorname
                const url= ` https://cnodejs.org/api/v1/user/${username}`
            Axios.get(url).then(res=>{
                console.log(res.data);
                this.setState({
                    AuthorInfo:res.data.data,
                })
            })
            }
        }else{
            this.setState({
                lookDetail:true
            })
            
        }
       
        
    }
    
    render() {
        const{AuthorInfo,lookDetail}=this.state
       console.log(AuthorInfo);
       
        
        return (
            <div>
            {AuthorInfo?
            <AuthorCon>
                <h3>作者信息</h3> 
                <div>{
                 <Author>
                 <Link to={`/user/${AuthorInfo.loginname}`}><img src={AuthorInfo.avatar_url} alt=""/></Link><span>{AuthorInfo.loginname}</span></Author>
                }
                </div>
             </AuthorCon>:<></>
            }
            
            </div>
        );
    }
}

export default AuthorInfo;
const Author=styled.div`
width:100%
img{
    width:50px;
    height:50px;
}
`
const AuthorCon=styled.div`
width:290px;
background-color:#fff;
border-radius:5px;
height:200px;
h3{
    background-color: #eee;
    border-radius:5px 5px 0 0;
}
`