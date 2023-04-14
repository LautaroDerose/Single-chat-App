import React, { useContext, useEffect, useRef } from 'react'

import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {

  const styles ={
    message: 'flex gap-5 mb-5',
    owner: 'flex flex-row-reverse',
    messageInfo: 'flex flex-col text-slate-400 font-[300]',
    avatarInfo: 'w-[40px] h-[40px] rounded-full object-cover ',
    messageContent: 'max-w-[80%] flex flex-col gap-3 ',
    avatarContent: 'w-[50%]',
    p: 'bg-teal-300 px-5 py-1 font-medium rounded-tr-lg rounded-b-lg max-w-max',
    pOwner: 'bg-emerald-300 text-slate-700 font-medium px-5 py-1 rounded-tl-lg rounded-b-lg max-w-max',
    messageContentOwner: 'messageContent items-end'

  }

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    <div
    ref={ref}
    className={`${styles.message} ${message.senderId === currentUser.uid && styles.owner} `}  
    >
      <div className={styles.messageInfo}>
        <img 
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          } 
          alt=' '  
          className={styles.avatarInfo} 
        />
        <span className='text-teal-700'>just now</span>
      </div>
      <div className={`${styles.messageContent}${styles.messageContentOwner}  `}>
        <p className={`   ${message.senderId === currentUser.uid ?styles.pOwner: styles.p}`}  >{message.text}</p>
        { message.img && <img src={message.img} className={styles.avatarContent} />}
      </div>
    </div>
  )
}

export default Message

