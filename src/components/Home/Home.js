import React, { Component } from 'react';
import styled from 'styled-components'
import Axios from 'axios';
import Post from '../Post/Post';
import { Skeleton } from 'antd'
class Home extends Component {
    state ={
        topics:[],
        current:1,
        type:'all',
    }
    componentDidMount() {
        const type=this.props.match.params.type
        const {current}=this.state
        const postId=this.props.match.params.postId
        const url = `https://cnodejs.org/api/v1/topics?tab=${type}&page=${postId}`
        Axios.get(url).then(res=>{
            this.setState({
                topics:res.data.data,
                type:type
              })
        })
    }
    
    render() {
        const{topics,current,type}=this.state
        const topicsItem = topics.map(e=><li key={e.id}><a href="javascript:;">{e.title}</a></li>)        
        return (
            <Wrap>
              {
                  topics.length?<Post current={current} onChange={this.onChange} topicsItem={topicsItem} type={type}/>:<Skeleton  active={true} title={false} paragraph={{ rows: 40 }} style={{width:'400px',margin:'0 auto'}}/>
              }
              
            </Wrap>
        );
    }
    onChange = (page) => {
        this.setState({
            current: page,
        })
        this.getAxios(page)
      }
    getAxios=(page)=>{
        const {type}=this.state
        const url = `https://cnodejs.org/api/v1/topics?tab=${type}&page=${page}`
        Axios.get(url).then(res=>{
            this.setState({
                topics:res.data.data
              })
        })
        
    }
}

export default Home;
const Wrap = styled.div`
width:660px;
background-color:#fff;
`