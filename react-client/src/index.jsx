import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Navbar from './components/Navbar.jsx';
import Reader from './components/Reader.jsx';
import Quotes from './components/Quotes.jsx';
import Glossary from './components/Glossary.jsx';
import pageText from './text.js';
import Popover from 'react-text-selection-popover';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'reader',
      text:[],
      selectedText:''
    }
    this.generateLines = this.generateLines.bind(this);
    this.changeView =this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.getText = this.getText.bind(this);
    this.addToGlossary = this.addToGlossary.bind(this);
    this.addToQuotes = this.addToQuotes.bind(this);
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

  addToQuotes(){

  }

  addToGlossary(){

  }

  changeView(option) {
    this.setState({
      view:option
    });
  }

  renderView() {
    const {view} = this.state;

    if (view === 'reader') {
      return <Reader text={this.state.text} getText={this.getText} addToGlossary={this.addToGlossary} addToQuotes={this.addToQuotes}/>
    }

    if (view === 'quotes') {
      return <Quotes />
    }

    if (view === 'glossary') {
      return <Glossary />
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

        <div className="side">
          <h3>Chapters</h3>
          {/* Possibly chapter pagination? flex container down*/}
        </div>

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

