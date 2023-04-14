import React, { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const styles = {
    navbar: 'flex items-center bg-teal-700 h-[50px] p-[10px] justify-between text-slate-200 border-r-4 border-emerald-200 ',
    logo: 'font-bold lg:flex hidden text-yellow-300',
    user: 'flex  gap-3 items-center relative ',
    image: 'bg-slate-200 h-[24px] w-[24px] rounded-full object-cover ',
    button: 'bg-emerald-600 text-[10px] text-slate-200 p-1.5 rounded-md border-none',
  }

  const {currentUser} = useContext(AuthContext);

  return (
    <div className={styles.navbar}>
      <span className={`${styles.logo}`}>Chat App</span>
      <div className='flex gap-4 justify-between'>
        <div className={styles.user}>
          <img src={currentUser.photoURL} alt='' className={styles.image} />
          <span>{currentUser.displayName}</span>
        </div>
          <button onClick={()=> signOut(auth)} className={`${styles.button} text-white p-1 rounded-md`} title='Logout' >
            <FiLogOut className='text-sm text-emerald-200' /> 
          </button>
      </div>
    </div>
  )
}

export default Navbar
