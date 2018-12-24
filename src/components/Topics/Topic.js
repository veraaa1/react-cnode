import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components'
import { Link} from 'react-router-dom';
import { Skeleton,Pagination } from 'antd'
import Moment from 'react-moment';
import 'moment/locale/zh-cn'
class Topic extends Component {
    state={
        topics:[],
        current:1,
        type:'all',
        current:1
       }
    componentDidMount() {
        const tab = this.props.location.pathname.replace('/','')
        const url = `https://cnodejs.org/api/v1/topics?tab=${tab?tab:'all'}&page=1`
        Axios.get(url).then(res=>{
            this.setState({
                topics:res.data.data,
                type:tab?tab:'all',
            })
        })
    }
    render() {
        const{topics,type,current}=this.state
        console.log(type);
        const navArr = [{
            type:'all',
            txt:'全部',
            num:83*40+10
        },{
            type:'good',
            txt:'精华',
            num:16*40+36
        },{
            type:'share',
            txt:'分享',
            num:34*40+4
        },{
            type:'ask',
            txt:'问答',
            num:49*40+6
        },{
            type:'job',
            txt:'招聘',
            num:16*40+34
        }]
        console.log(topics);
        
        const topicsItem = topics.map(e=><li key={e.id}><Link to={`/user/${e.author.loginname}`} className="userImg"><img src={e.author.avatar_url} alt=""/></Link>
        <span className='count'>
            <span>{e.reply_count}</span>
            /
            <span>{e.visit_count}</span>
        </span> 
        <span className={e.top||e.good?'top':'default'}>{e.top?'置顶':e.good?'精华':e.tab==='share'?'分享':e.tab==='ask'?'问答':'招聘'}</span>
        <Link to={`/topic/${e.id}`} className='title'>{e.title}</Link><Moment fromNow locale="zh-cn">{e.last_reply_at}</Moment></li>)  
        return (
            <div>
                {
                    topics.length?<Ul>
                    {topicsItem}
                </Ul>:<Skeleton  active={true} title={false} paragraph={{ rows: 40 }} style={{width:'400px',margin:'0 auto'}}/>
                }
                <Pagination current={current} onChange={this.onChange} total={(navArr[navArr.findIndex(e=>e.type===type)].num)} pageSize={40} />
            </div>
        );
    }
    onChange=(page)=>{
        const {type}=this.state
        const url = `https://cnodejs.org/api/v1/topics?tab=${type?type:'all'}&page=${page}`
        Axios.get(url).then(res=>{
            this.setState({
                topics:res.data.data,
                current:page
            })
        })
        
    }
}

export default Topic;
const Ul = styled.ul`
list-style:none;
width:100%;
margin:0 auto;
padding-left:0;
li{
    width:100%;
    border-top:1px solid #f0f0f0;
    padding:10px 10px;
    display:flex;
    
}
li>.userImg{
    display: inline-block;
    width:30px;
    height: 30px;
    text-decoration:none;
    
    margin-right:10px;
}
li>a>img{
    width:100%;
    height: 30px;
    border-radius:5px;
    
}
li>.count{
    line-height:30px;
    display:inline-block;
    width:70px;
}
li:hover{
    background-color:#f5f5f5;
}
li:hover a{
    text-decoration:underline
}
li>.top{
    background-color:#80bd01;
    color: #fff;
    padding:0 5px;
    border-radius:3px;
    height: 24px;
    line-height:24px;
}
li>.default{
    background-color:#e5e5e5;
    color: #999;
    padding:0 5px;
    border-radius:3px;
    height: 24px;
    line-height:24px;
}
li>.title{
    display: block;
    max-width:70%;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    color: #000;
    font-size:14px;
    line-height:30px;
    padding-left:10px;
}
:first-child{
    border:none;
}

`