import React, { Component } from 'react';
import { Pagination } from 'antd'
import styled from 'styled-components'
class Post extends Component {
    render() {
        const{current,onChange,topicsItem,type}=this.props
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
        return (
            <>
                <Ul>
                    {topicsItem}
                </Ul>
                <Pagination current={current} onChange={onChange} total={(navArr[navArr.findIndex(e=>e.type===type)].num)} pageSize={40} />
            </>
        );
    }
}

export default Post;
const Ul = styled.ul`
list-style:none;
width:100%;
margin:0 auto;
padding-left:0;
li{
    width:100%;
    border-top:1px solid #f0f0f0;
    padding:10px 10px;
    
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
}
:first-child{
    border:none;
}

`