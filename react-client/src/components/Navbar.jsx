import React from 'react';

const Navbar = (props) => {

  return(
    <div className="navbar">
      <div className='link' onClick={()=> props.changeView('reader')}>Home</div>
      <div className='link' onClick={()=> props.changeView('quotes')}>Quotes</div>
      <div className='link' onClick={()=>props.changeView('glossary')}>Glossary</div>
    </div>
  )
}

export default Navbar;