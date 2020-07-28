import React from 'react';

/*
add the book chapter page
need to check if ends with quotes
if not add else do not
*/

const Quotes = (props) => {

  return (
    <div>
      <h1>Quotes</h1>
      {props.quotes.map((quote, index) => {
        return (
        <li key={`q${index}`} className="quotes">
          {`"${quote.quote}"`}
        </li>)
      })}
    </div>
  )
}

export default Quotes;