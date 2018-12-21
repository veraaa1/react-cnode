import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components'
import { Skeleton,Pagination } from 'antd'
class Topic extends Component {
    state={
        topics:[],
        current:1,
        type:'all',
        current:1
       }
    componentDidMount() {
        const tab = this.props.match.params.tab
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
        
        const topicsItem = topics.map(e=><li key={e.id}><img src={e.author.avatar_url} alt=""/><a href="javascript:;">{e.title}</a></li>)  
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
li>img{
    width:30px;
    height: 30px;
    margin-right:10px;
    border-radius:5px;
}
li:hover{
    background-color:#f5f5f5;
}
li:hover a{
    text-decoration:underline
}
li>a{
    display: block;
    max-width:70%;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    color: #000;
    font-size:14px;
    line-height:30px;
}
:first-child{
    border:none;
}

`