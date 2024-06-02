import React from 'react'
import "./list.css" ;
import ChatList from './ChatList/ChatList';
import UserInfo from './userinfo/UserInfo';
const List = () => {
  return (
    <div className='list'>
<UserInfo />
<ChatList />


    </div>
  )
}

export default List