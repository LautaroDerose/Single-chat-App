import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {

  const styles = {
    container: 'h-screen flex items-center justify-center bg-emerald-200 ',
    wrapper: ' w-[400px] px-[20px] py-[30px] flex flex-col items-center justify-center bg-white rounded-md shadow-xl drop-shadow-lg',
    input: 'p-[15px] w-[250px] outline-none border-b border-emerald-200 hover:border-blue-300 hover:-translate-y-1 duration-300  placeholder-slate-500 z-0 focus:bg-emerald-100 ',
    button: 'bg-emerald-300 w-[60%] mx-auto py-2 rounded-md font-bold text-emerald-700 hover:text-emerald-800  hover:-translate-y-1 hover:bg-emerald-400  duration-300 my-2 ',
  }

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className='flex items-center justify-center bg-emerald-600 w-full h-[40px] py-[36px] rounded-md'>
            <span className='  text-yellow-300 font-bold text-[24px] mx-auto' >Chat App</span>
        </div>
            <span className='text-[12px] mx-auto mt-3 z-10 text-slate-600 font-bold mb-2 ' >Iniciar Sesion</span>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 justify-center ' >
            <input type='email' placeholder='Escribe tu email' className={styles.input} />
            <input type='password' placeholder='Escribe tu contrasena' className={styles.input} />
            <button className={styles.button}>Sign In</button>
        </form>
        <p className='text-slate-500'>You don't have an account? <Link to='/register' className='text-emerald-600 underline cursor-pointer'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login
