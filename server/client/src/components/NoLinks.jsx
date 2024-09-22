import React from 'react'
import empty from '../assets/empty.svg'

function NoLinks() {
  return (
    <div className="no-links" role="region" aria-labelledby="no-links-heading">
      <img src={empty} alt="Illustration of no links available" />
      <h2 id="no-links-heading">Let’s get you started</h2>
      <p>
        Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
      </p>
    </div>
  )
}

export default NoLinks