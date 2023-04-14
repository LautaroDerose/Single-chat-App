import React from 'react'
import { Sidebar, Chat } from '../components/index'
const Home = () => {

  const styles = {
    home: 'h-screen flex items-center justify-center bg-slate-300 ',
    container: 'shadow-xl drop-shadow-lg rounded-md sm:w-[90%] md:w-[90%] lg:w-[65%] h-[80%] flex overflow-hidden border-b-4 border-emerald-700 ',
    // wrapper: ' w-[400px] px-[20px] py-[60px] flex flex-col items-center justify-center bg-white rounded-md',
    // input: 'p-[15px] w-[250px] border-b border-blue-200 hover:border-blue-300 hover:-translate-y-1 duration-300  placeholder-slate-500 z-0 ',
    // label:'flex items-center font-medium border-b border-blue-200 hover:border-blue-300 text-blue-400 hover:text-blue-500 hover:-translate-y-1 duration-300 cursor-pointer gap-2',
     
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home
