import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context/AuthContext';
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";


const Chats = () => {

  const styles = {
    chats: '',
    userChat: 'p-[10px] flex items-center gap-3 text-white cursor-pointer hover:bg-emerald-300 duration-200 ',
    image: ' w-[50px] h-[50px] rounded-full object-cover ',
    userChatInfo: '',
    span: 'text-[18px] font-[500] text-sky-950',
    p: 'text-[14px] text-slate-600',
  }

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };


  return (
    <div className={styles.chats}  >
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (

        <div className={styles.userChat} 
          onClick={() => handleSelect(chat[1].userInfo)}
          key={chat[0]}
        >
          <img src={chat[1].userInfo.photoURL} alt=''className={styles.image} />
          <div className={styles.userChatInfo}>
            <span className={styles.span}>{chat[1].userInfo.displayName}</span>
            <p className={styles.p}>{chat[1].lastMessage?.text}</p>
          </div>
        </div>

      ))}
      
    </div>
  )
}

export default Chats
