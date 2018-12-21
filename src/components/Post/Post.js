import React, { Component } from 'react';
import Axios from 'axios'
import styled from 'styled-components'
import Topic from '../Topics/Topic';
import {filter} from '../static/filter'
import { Skeleton } from 'antd'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
class Post extends Component {
    state={
        topicContent:null
    }
    //登录和未登录请求的文章详情是不一样的,登陆时候请求 是需要参数的,因为要判断是否收藏
    componentDidMount() {
       const id = this.props.match.params.id
       const url= ` https://cnodejs.org/api/v1/topic/${id}`
       Axios.get(url).then(res=>{
           this.setState({
               topicContent:res.data.data
           })
       })
       
    }
    
    render() {
        const {topicContent}=this.state
        console.log(topicContent);
        
        return (
                <Wrap>
                    {topicContent?<><h1>{topicContent.title}</h1>
                    <div className='author-Info'><span>作者:{topicContent.author.loginname}&nbsp;&nbsp;来自:{filter(topicContent.tab)}</span></div>
                    <div dangerouslySetInnerHTML={{ __html: topicContent.content}}></div></>:<Skeleton  active={true} title={false} paragraph={{ rows: 40 }} style={{width:'400px',margin:'0 auto'}}/>}
                </Wrap>
        );
    }
}

export default Post;
const Wrap = styled.div`
width:890px;
padding:10px;
border-radius:5px 5px 0 0;
margin-right:10px;
background-color:#fff;
.author-Info{
    border-bottom:1px solid #ccc;
    padding:20px 0;
}
>div img{
    width:90%;
    margin:0 auto;
}
>div ul{
    list-style:none;
}
`