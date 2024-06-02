import React from 'react'
import Nav from './Nav'
import ProfilePage from './ProfilePage'
import AddLinkPage from './AddLinkPage'
import { useState } from 'react'

function App() {
  const [togglePage, setTogglePage] = useState(false)
  console.log(togglePage)
  return (
    <div>
        <Nav togglePage={togglePage} setTogglePage={setTogglePage} />
        {togglePage === false ? <ProfilePage /> :  <AddLinkPage />}
    </div>
  )
}

export default App