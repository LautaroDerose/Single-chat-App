import React, { useContext, useEffect, useState } from 'react'
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Message from './Message'
import { ChatContext } from '../context/ChatContext'


const Messages = () => {

    const styles ={
        messages: ' p-3 flex-grow-1',
    }

    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect( () => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages)
      })

      return () => {
        unSub()
      }

    }, [data.chatId])

  return (
    <div className={styles.messages}>
      {
        messages.map((m) => (
          <Message message={m} key={m.id} />
        ))
      }

    </div>
  )
}

export default Messages
