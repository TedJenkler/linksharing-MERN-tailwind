import React, { useState } from 'react'
import Nav from '../components/Nav';

function App() {
    const [page, setPage] = useState('profile');
  return (
    <>
        <Nav page={page} setPage={setPage} />
        <main>
      
        </main>
    </>
  )
}

export default App