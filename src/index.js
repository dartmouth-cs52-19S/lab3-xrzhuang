/* eslint-disable global-require */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import Note from './components/note';
import InputBar from './components/create_note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onDelete(id) {
    this.setState(prevState => ({
      notes: prevState.notes.delete(id),
    }));
  }

  onAdd(str) {
    console.log(str);
    const note = {
      title: str,
      text: 'new note',
      x: this.state.id * 3,
      y: 50,
      zIndex: (this.state.id),
    };
    this.setState(prevState => ({
      notes: prevState.notes.set(prevState.id + 1, note),
      id: prevState.id + 1,
    }));
  }

  render() {
    return (
      <div id="Title-Create">
        <img id="Title-Pin" src={require('./img/pin.png')} height="40px" width="50px" alt="pin" />
        <h1 id="Title-Card">My Note Board</h1>
        <InputBar addTitle={this.onAdd} />
        <div id="note-section">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note key={id} id={id} title={note.title} text={note.text} x={note.x} y={note.y} onDelete={this.onDelete} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
