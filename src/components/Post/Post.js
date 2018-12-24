import React, { Component } from 'react';
import Axios from 'axios'
import styled from 'styled-components'
import {filter} from '../static/filter'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import 'moment/locale/zh-cn'
class Post extends Component {
    state={
        topicContent:null,
        val:'',
        isReply:false,
        replyVal:'',
        replyId:0
    }
    //登录和未登录请求的文章详情是不一样的,登陆时候请求 是需要参数的,因为要判断是否收藏
    componentDidMount() {
       const id = this.props.match.params.id
       const {token}=sessionStorage

       const url= ` https://cnodejs.org/api/v1/topic/${id}?${token?`accesstoken=${token}`:''}`
       Axios.get(url).then(res=>{
           this.setState({
               topicContent:res.data.data
           })
       })
       
    }
    
    render() {
        const {topicContent,val,isReply,replyId,replyVal}=this.state
        console.log(topicContent);
        
        return (
                <Wrap>
                    {topicContent?<><h1>{topicContent.title}</h1>
                    <div className='author-Info'><span>作者:{topicContent.author.loginname}&nbsp;&nbsp;来自:{filter(topicContent.tab)}</span>
                    {sessionStorage.token?<button onClick={()=>{
                        this.collect(topicContent.id)
                    }}>{topicContent.is_collect?'取消收藏':'收藏'}</button>:<></>}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: topicContent.content}}></div>
                    <div className="comment">
                        <p>{topicContent.replies.length}条回复</p>
                        <ul>
                            {topicContent.replies.map(e=><li><Link to={`/user/${e.author.loginname}`}><img src={e.author.avatar_url} alt=""/></Link><span>{e.author
                            .loginname}</span>
                            <Moment fromNow locale="zh-cn" className="comment-time">{e.create_at}</Moment>
                            <div className="com" dangerouslySetInnerHTML={{ __html: e.content}}></div><a href="javascript:;" onClick={()=>{
                                this.ups(e.id)
                            }}>{e.ups.length}个赞</a>
                            <button onClick={()=>{this.replyComment(e.author.loginname,e.id)}}>回复</button>
                            {isReply&&e.id===replyId?<div>
                            <textarea name="" id="" cols="30" rows="10" value={replyVal} onChange={this.handleChange}></textarea>
                            <button onClick={
                                this.sureReply
                            }>提交</button>
                            </div>:<></>}
                            </li>)}
                        </ul>
                    </div>
                    {
                        sessionStorage.token? <div className="write-comment">
                        <input type="text" value={val} onChange={this.onChange}/>
                        <button onClick={this.addComment}>提交评论</button>
                    </div>:<></>
                    }
                   
                    </>:<Skeleton  active={true} title={false} paragraph={{ rows: 40 }} style={{width:'400px',margin:'0 auto'}}/>}
                </Wrap>
        );
    }
    onChange=(event)=>{
      this.setState({
          val:event.target.value
      })
    }
    handleChange=(event)=>{
        this.setState({
            replyVal:event.target.value
        })
    }
    addComment=()=>{
      const {val,topicContent}=this.state
      const replyTopicId = topicContent.id
      if(sessionStorage.token){
        if(val.trim()){
            Axios.post(`https://cnodejs.org/api/v1/topic/${replyTopicId}/replies`,{accesstoken:sessionStorage.token,title:topicContent.title,tab:'dev',content:val}).then(res=>{
                console.log(res);
                const url= `https://cnodejs.org/api/v1/topic/${replyTopicId}`
                 Axios.get(url).then(res=>{
                    this.setState({
                         topicContent:res.data.data,
                         val:''
                                })
                    })
            })
          }else{
              alert('评论不允许为空!')
          }
      }else{
          alert('您还没登录哦')
      }
     
    }
    replyComment=(loginname,id)=>{
        const {isReply}=this.state
       this.setState({
        isReply:!isReply,
        replyId:id,
        replyVal:`@${loginname}`
       })
    }
    collect=(id)=>{
        const {topicContent}=this.state
        const isCollect = topicContent.is_collect
    if(!isCollect){
        Axios.post(`https://cnodejs.org/api/v1/topic_collect/collect`,{accesstoken:sessionStorage.token,topic_id:id}).then(res=>{
            const newCon = {...topicContent}
            newCon.is_collect=!isCollect
            this.setState({
                topicContent:newCon
            })
        })
    }else{
        Axios.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`,{accesstoken:sessionStorage.token,topic_id:id}).then(res=>{
            const newCon = {...topicContent}
            newCon.is_collect=!isCollect
            this.setState({
                topicContent:newCon
            })
        })
    }
    
    }
    sureReply=()=>{
        const {replyVal,topicContent,replyId}=this.state
      const replyTopicId = topicContent.id
      if(replyVal.trim()){
        Axios.post(`https://cnodejs.org/api/v1/topic/${replyTopicId}/replies`,{accesstoken:sessionStorage.token,title:topicContent.title,tab:'dev',content:replyVal,reply_id:replyId}).then(res=>{
            console.log(res);
            const url= `https://cnodejs.org/api/v1/topic/${replyTopicId}`
             Axios.get(url).then(res=>{
                this.setState({
                     topicContent:res.data.data,
                     replyVal:'',
                     isReply:false
                            })
                })
        })
      }else{
          alert('评论不允许为空!')
      } 
      }
    ups=(id)=>{
        const {topicContent}=this.state
      Axios.post(`https://cnodejs.org/api/v1/reply/${id}/ups`,{accesstoken:sessionStorage.token}).then(res=>{
          const status = res.data.action
          const newTOC = {...topicContent}
          if(status==='up'){
              newTOC.replies.find(e=>e.id===id).ups.push(sessionStorage
                .id)
              this.setState({
                topicContent:newTOC
              })
          }else{
              console.log(1111111111);
              
            newTOC.replies.find(e=>e.id===id).ups=newTOC.replies.find(e=>e.id===id).ups.filter(e=>e!==sessionStorage.id)
              this.setState({
                topicContent:newTOC
              })
          }
      })
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
.comment{
    width:100%;
}
.comment>p{
    width:100%;
    padding:5px 0 5px 10px;
}
.comment>ul{
    width:100%;
    list-style:none;
}
.comment-time{
    padding-left:30px;
}
.comment>ul>li{
    width:100%;
    border-bottom:1px solid #ccc;
    padding:5px;
}
.com{
    padding-left:50px;
}
.comment>ul>li>a{
    display: inline-block;
    width:40px;
    height: 40px;
    border-radius:5px;
    margin-right: 10px 
    }
.write-comment>input:first-child{
    width:400px;
    border:none;
    border:1px solid #ccc;
    outline:none;
    border-radius:5px;
    margin-top:10px;
}

`