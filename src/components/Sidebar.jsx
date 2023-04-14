import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  const styles = {
    sidebar: 'bg-emerald-200 relative ',
    buttonContainer: 'absolute object-left-bottom'
   
  }

  return (
    <div className={styles.sidebar} style={{flex: 1}}>
      <Navbar buttonStyle={styles.buttonContainer} />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar
