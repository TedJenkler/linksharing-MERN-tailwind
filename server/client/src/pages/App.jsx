import React, { useState } from 'react';
import Nav from '../components/Nav';
import ProfilePageContainer from '../components/ProfilePageContainer';
import DisplayPreview from '../components/DisplayPreview';
import LinkPageContainer from '../components/LinkPageContainer';

function App() {
    const [page, setPage] = useState('profile');

    return (
        <>
            <Nav page={page} setPage={setPage} />
            <div className='app-container'>
                <DisplayPreview />
                {page === 'profile' && <ProfilePageContainer />}
                {page === 'links' && <LinkPageContainer />}
            </div>
        </>
    );
}

export default App;