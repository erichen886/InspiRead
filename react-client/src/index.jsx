import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Navbar from './components/Navbar.jsx';
import Reader from './components/Reader.jsx';
import Quotes from './components/Quotes.jsx';
import Glossary from './components/Glossary.jsx';
import pageText from './text.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'reader',
      text:[],
      quotes:[],
      glossary:[],
      selectedText:''
    }
    this.generateLines = this.generateLines.bind(this);
    this.changeView =this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getText = this.getText.bind(this);
    this.addToGlossary = this.addToGlossary.bind(this);
    this.addToQuotes = this.addToQuotes.bind(this);
    this.getQuotes = this.getQuotes.bind(this);
    this.getGlossary = this.getGlossary.bind(this);
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
    let lineArr = this.generateLines();
    this.setState({
      text: lineArr
    })

    this.getGlossary();
    this.getQuotes();

  }

  generateLines() {
    //loop through content
    return pageText().split('\n');
    //list of content
    //each item of list is a sentence
    //return div as row
  }

  getText(){
    if(document.getSelection) {
      let selectedText = document.getSelection().toString();
      this.setState({
        selectedText: selectedText
      })
    }
  }

  getQuotes() {
    axios({
      method: 'get',
      url: '/quotes',
    })
    .then((quotes) => {
      this.setState({
        quotes: quotes.data
      })
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log (error.request)
      } else {
        console.log ('Error', error.message);
      }
    })
  }

  getGlossary() {
    console.log('gloss')
    axios({
      method: 'get',
      url: '/glossary',
    })
    .then((glossary) => {
      this.setState({
        glossary: glossary.data
      })
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log (error.request)
      } else {
        console.log ('Error', error.message);
      }
    })
  }

  addToQuotes(){
    axios({
      method: 'post',
      url: '/quotes',
      data: {
        quote: this.state.selectedText
      }
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log (error.request)
      } else {
        console.log ('Error', error.message);
      }
    })

    this.getQuotes();
  }

  addToGlossary(){
    let word = this.state.selectedText;
    axios({
      method:'get',
      url: `https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.MERRIAM_API_KEY}`
    })
    .then ((definition) => {
      let def = definition.data[0]['shortdef'];
      axios({
        method: 'post',
        url: '/glossary',
        data: {
          word: word,
          definition: def
        }
      })
    })
    .catch((error) => {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log (error.request)
      } else {
        console.log ('Error', error.message);
      }
    })

    this.getGlossary();
  }

  changeView(option) {
    this.setState({
      view:option
    });
  }

  renderView() {
    const {view} = this.state;

    if (view === 'reader') {
      return (
        <React.Fragment>
          <Reader text={this.state.text} getText={this.getText} addToGlossary={this.addToGlossary} addToQuotes={this.addToQuotes}/>
          <div className="side">
            <h3>Chapters</h3>
            {/* Possibly chapter pagination? flex container down*/}
          </div>
        </React.Fragment>
      )
    }

    if (view === 'quotes') {
      return <Quotes quotes={this.state.quotes}/>
    }

    if (view === 'glossary') {
      return <Glossary glossary={this.state.glossary}/>
    }
  }

  render () {
    return (
    <div>
      {/* header */}
      <div className="header">
        <h1>InspiRead</h1>
      </div>

      {/* Navigation Bar */}
      <Navbar changeView={this.changeView}/>

      {/* The flexible grid (content) */}
      <div className="row">
        {this.renderView()}

      </div>

      {/* Footer */}
      <div className="footer">
        <h2>Place Buttons?</h2>
      </div>

    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

