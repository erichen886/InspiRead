import React from 'react';
import Popover from 'react-text-selection-popover';

const Reader = (props) => {

  const refWords = React.createRef();
  return (
    <div className="main" onClick={props.getText} ref={refWords}>
      <h2>Alice in Wonder Land Ch 10</h2>
      {props.text.map((line, index) => {
        let words = line.trim().split(' ');
        return (
          <div key={index} className={`${index} line`}>
            {words.map((word, rIndex) => {
              return(
                <span key={`${index}-${rIndex}`} className={`${index}-${rIndex}`}>
                {`${word } `}
                </span>
              )
            })}
          </div>
        )
      })}
      <Popover selectionRef={refWords}>
        <div className="popup">
          <span className="popover" onClick={props.addToQuotes}>Add to quotes  </span>
          <span>|</span>
          <span className="popover" onClick={props.addToGlossary}>  Add to glossary</span>
        </div>
      </Popover>
    </div>
  )
}

export default Reader;