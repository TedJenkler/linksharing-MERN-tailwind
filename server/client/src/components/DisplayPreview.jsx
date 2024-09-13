import React from 'react'
import previewcontainer from '../assets/images/preview-section.svg'; 

function DisplayPreview() {
  return (
    <aside className='display-preview'>
        <img src={previewcontainer} alt='preview lists' />
    </aside>
  )
}

export default DisplayPreview
