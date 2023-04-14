import React, { useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate("/")
          });
        }
      );
      } catch(err) {
        setErr(true)
      }
    };

    const styles = {
    container: 'h-screen flex items-center justify-center bg-emerald-200 ',
    wrapper: ' w-[400px] px-[20px] py-[30px] flex flex-col items-center justify-center bg-white rounded-md shadow-xl drop-shadow-lg',
    input: 'p-[15px] w-[250px] border-b border-emerald-200 hover:border-emerald-300 hover:-translate-y-1 duration-300  placeholder-slate-500 z-0 outline-none focus:bg-emerald-100 ',
    label:'flex items-center font-medium border-b border-emerald-200 hover:border-emerald-300 text-emerald-400 hover:text-emerald-500 hover:-translate-y-1 duration-300 cursor-pointer gap-2',
    button: 'bg-emerald-300 w-[60%] mx-auto py-2 rounded-md font-bold text-emerald-700 hover:text-emerald-800  hover:-translate-y-1 hover:bg-emerald-400  duration-300 my-2 ',
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className='flex items-center justify-center bg-emerald-600 w-full h-[40px] py-[36px] rounded-md'>
            <span className='  text-yellow-300 font-bold text-[24px] mx-auto' >Chat App</span>
        </div>
            <span className='text-[12px] mx-auto mt-3 z-10 text-slate-600 font-bold mb-2' >Registro</span>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 justify-center ' >
            <input type='input' placeholder='Escribe tu nombre' className={styles.input} />
            <input type='email' placeholder='Escribe tu email' className={styles.input} />
            <input type='password' placeholder='Escribe tu contrasena' className={styles.input} />
            <input style={{display: 'none'}} type='file' id='file' placeholder='Seleccione su foto de perfil' className='' />
            <label htmlFor='file' className={styles.label} > 
              <RiImageAddLine className='text-[36px] m-2 ' /> 
              <span>Add an avatar</span>
            </label>
            <button className={styles.button}>Sign Up</button>
            {err && <span>Something went wrong</span>}
        </form>
        <p className='text-slate-500'>You do have an account? <Link to='/login' className='text-emerald-600 underline cursor-pointer'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register
