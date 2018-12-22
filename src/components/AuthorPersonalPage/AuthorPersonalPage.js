import React, { Component } from 'react';
import styled from 'styled-components'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import Axios from 'axios';
import { Link ,Switch} from 'react-router-dom';
import NewTopicEnter from '../NewTopicEnter/NewTopicEnter'
class AuthorPersonalPage extends Component {
    state={
        detail:null,
        authorTopics:null,
       isShowAu:false
    }
    componentDidMount() {
        const location = this.props.location.pathname
        console.log(location);
        const author = location.replace('/user/','')
        Axios.get(`https://cnodejs.org/api/v1${location}`).then(res=>{
            console.log(res.data.data);
            this.setState({
                detail:res.data.data
            })
        })
        Axios.get(`https://cnodejs.org/api/v1/topic_collect/${author}`).then(res=>{
            console.log(res.data);
            
            this.setState({
                authorTopics:res.data.data
            })
        })
    }
    render() {
        const {detail,authorTopics,isShowAu}=this.state
        console.log(isShowAu);
        
        return (
            <Content>
                <Wrap>

                    {
                      detail&&authorTopics? <div className="details">
                      <div className="author-page">
                          <div className="detailinfo">
                            <Link to="/">主页</Link>
                          </div>
                        <Link to={`/user/${detail.loginname}`}><img src={detail.avatar_url} alt=""/></Link>
                        <span>{detail.loginname}</span>
                        <p>积分:{detail.score}</p>
                        <p>{detail.create_at}</p>
                        <Link to='/' className="like">{authorTopics.length}个话题收藏</Link>
                      </div>
                      <div className="recent-Topics">
                        <p className="tit">最近创建的话题</p>
                             {
                               detail? <ul>{detail.recent_topics.map(e=><li><Link to={`/user/${detail.loginname}`}><img src={detail.avatar_url}  alt=""/></Link><Link to={`/topic/${e.id}`}>{e.title}</Link></li>)}</ul>:<></>
                             }
                         
                      </div>
                      <div className="recent-reply">
                      <p className="tit">最近参与的话题</p>
                            {
                               detail? <ul>{detail.recent_replies.map(e=><li><Link to={`/user/${e.author.loginname}`} onClick={()=>{
                                    this.up(e.author)
                               }}><img src={e.author.avatar_url} alt="" /></Link><Link to={`/topic/${e.id}`}>{e.title}</Link></li>)}</ul>:<></>
                             }

                      </div>
                      </div> :<div></div>
                    }
                    
                </Wrap>
                {detail? <AuthorCon>
                <h3>作者信息</h3> 
                <div>
                 <Author>
                 <Link to={`/user/${detail.loginname}`}><img src={detail.avatar_url} alt=""/></Link><span>{detail.loginname}</span></Author>
                </div>
                {sessionStorage.token?<NewTopicEnter/>:<></>}
             </AuthorCon>:<></>}
            </Content>
        );
    }
    up=(obj)=>{
        console.log(obj);
        Axios.get(`https://cnodejs.org/api/v1/user/${obj.loginname}`).then(res=>{
            this.setState({
                detail:res.data.data,
                isShowAu:true
            })
        })
    }
}

export default AuthorPersonalPage;
const Wrap = styled.div`
width:910px;

margin-right:10px;
border-radius:5px 5px 0 0 ;
.detailinfo{
    width:100%;
    background-color:#eee;
    border-radius:5px;
}
.detailinfo>a{
    color: #000;
    display: inline-block;
    padding:5px 0;
}
.details{
    width:100%;
    padding-bottom:10px;
    border-radius:5px;
}
.author-page{
    width:100%;
    padding-bottom:10px;
    background-color:#fff;
}
.author-page>a{
    display:inline-block;
    width:50px;
    height: 50px;
    border-radius:5px;
    margin:10px;
}
.author-page>.like{
    width:100%
}
.author-page>p{
    padding-left:10px;
    margin-bottom:0
}
.author-page a img{
    width:100%;
    border-radius:5px;
}
.recent-reply,.recent-Topics{
    width:100%;
    margin-top:10px;
    border-radius:5px;
    background-color:#fff;
}
.recent-reply>.tit,.recent-Topics>.tit{
    width:100%;
    line-height:30px;
    padding-left:10px;
    background-color:#eee;
}
.recent-reply>ul,.recent-Topics>ul{
    width:100%;
    list-style:none;
}
.recent-reply>ul>li,.recent-Topics>ul>li{
    width:100%;
}
.recent-reply>ul>li>a:first-child,.recent-Topics>ul>li>a:first-child{
    display: inline-block;
    width:40px;
    height: 40px;
    border-radius:3px;
}
.recent-reply>ul>li>a:first-child>img,.recent-Topics>ul>li>a:first-child>img{
    width:90%;
    padding:5px 0 5px 10px;
}
.recent-reply>ul>li>a:last-child,.recent-Topics>ul>li>a:last-child{
    display: inline-block;
    white-space:nowrap;
    text-overflow:ellipsis;
}

`
const Content=styled.div`
width:90%;
margin:0 auto;
display:flex;
border-radius:5px;
`
const Author=styled.div`
width:100%
img{
    width:50px;
    height:50px;
    margin:10px;
    border-radius:5px;
}
`
const AuthorCon=styled.div`
width:290px;
border-radius:5px;
height:200px;
>div{
    background-color:#fff;
}
h3{
    background-color: #eee;
    border-radius:5px 5px 0 0;
    margin-bottom:0;
}
`