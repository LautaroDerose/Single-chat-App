import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

import { IoSearchCircleOutline } from 'react-icons/io5'

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  const styles = {
    search: 'bg-emerald-400 border-[8px] border-emerald-200',
    searchForm: 'p-2 outline-none flex  border-b-4 border-emerald-500  mx-auto',
    input: 'bg-transparent text-emerald-950 font-medium border-none placeholder-emerald-700 outline-none ml-1.5 ',
    text: '',
    userChat: 'p-[10px] flex items-center gap-3 text-white cursor-pointer hover:bg-slate-600 duration-200 ',
    image: ' w-[50px] h-[50px] rounded-full object-cover ',
    userChatInfo: '',
  }
  
  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <IoSearchCircleOutline className='text-[24px] text-emerald-700 ' />
        <input 
          type='text' 
          className={styles.input} 
          placeholder='find a user' 
          onKeyDown={handleKey} 
          onChange={e=>setUsername(e.target.value)} 
          value={username}  
        />
      </div>
      { err && <span>User not found!</span> }
      {
        user &&
        <div className={styles.userChat} onClick={handleSelect} >
          <img src={user.photoURL} alt=''className={styles.image} />
          <div className={styles.userChatInfo}>
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}

export default Search
