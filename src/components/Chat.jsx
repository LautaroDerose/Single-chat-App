import React, { useContext } from 'react'
import { BsFillCameraVideoOffFill, BsPersonPlusFill, BsThreeDots } from 'react-icons/bs';
import Messages from './Messages';
import Input from './Input';
import '../index.css'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  
  const styles = {
    chat: 'h-full',
    chatInfo: 'h-[50px]  bg-teal-700 flex items-center justify-between p-[10px] text-teal-100',
    chatIconsContainer: ' flex gap-4 ',
    chatIcons: 'h-[18px] w-[18px] cursor-pointer ',
    chatContent: 'flex flex-col justify-between h-[calc(100%-50px)]',
    messagesContainer: ' h-[100%] bg-teal-100 p-3 flex-grow-1 overflow-y-scroll',
    inputContainer: ' bg-emerald-100',
  }

  const { data } = useContext(ChatContext);

  return (
    <div className={styles.chat}  style={{flex: 2}}>
      <div className={styles.chatInfo}>
        <span>{data.user?.displayName}</span>
        <div className={styles.chatIconsContainer}>
          <BsFillCameraVideoOffFill className={styles.chatIcons} title='disabled' />
          <BsPersonPlusFill className={styles.chatIcons} />
          <BsThreeDots className={styles.chatIcons} />
        </div>
      </div>
        <div className={styles.chatContent}>
        <div className={styles.messagesContainer} >
          <Messages />
        </div>
        <div className={styles.inputContainer}>
          <Input />
        </div>
        </div>
    </div>
  )
}

export default Chat
