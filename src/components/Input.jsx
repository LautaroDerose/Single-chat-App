import React, { useContext, useState } from 'react'
import { MdOutlineAttachFile } from 'react-icons/md'
import { RiImageAddLine } from 'react-icons/ri'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { v4 as uuid } from 'uuid'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


const Input = () => {

 

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const styles ={
    inputContainer: ' border-t-4 border-emerald-200 flex items-center justify-between p-2',
    input: 'w-[80%] border-none outline-none bg-emerald-100 text-slate-600 text-[18px] placeholder-slate-400  ',
    send:'flex items-center gap-3',
    chatIcons: 'h-[24px] w-[24px] text-emerald-600  ',
    button: 'border-none py-2 px-4 text-yellow-400 font-bold bg-emerald-800 rounded-sm ',
  }

  return (
    <div className={styles.inputContainer} >
      <input className={styles.input} 
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className={styles.send}>
        <MdOutlineAttachFile className={styles.chatIcons} />
        <input className={styles.input} 
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label className=''>
          <RiImageAddLine className={styles.chatIcons} />
        </label>
        <button onClick={handleSend} className={styles.button}>Send</button>
      </div>
    </div>
  )
}

export default Input
