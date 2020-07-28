import React from 'react';

/*
sort by alphabetical
verb, adj, noun, adv
add pronunciation and possibly sound clip
*/
const Glossary = (props) =>{

  return (
    <div>
      <h1>Glossary</h1>
      {props.glossary.map((word, index)=> {
        console.log (word);
        return (
        <div className="word" key={`g${index}`}>
          {`${index + 1}. ${word.word}:`}
          {word.definition.map((def,ind) =>{
            return (
              <li className="def" key={`d${ind}`}>{def}</li>
            )
          })}
        </div>)
      })}
    </div>
  )
}

export default Glossary;