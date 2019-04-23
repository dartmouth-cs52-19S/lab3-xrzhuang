/* eslint-disable global-require */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import Note from './components/note';
import InputBar from './components/create_note';
import DataStore from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      // eslint-disable-next-line new-cap
      notes: Map(),
      clearAll: true,
    };
    this.db = new DataStore();
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onClear = this.onClear.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.db.fetchNotes((notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  // deleting a note given id
  onDelete(id) {
    // decrement counter
    this.setState(prevState => ({
      n: prevState.n - 1,
    }));

    // delete note from db
    this.db.deleteNote(id);
  }

  // Adding a note given input str
  onAdd(str) {
    // create the new note, set defaults
    const note = {
      title: str,
      text: 'New Note Content',
      x: 50,
      y: 50,
      zIndex: (this.state.n),
    };

    // increment counter
    this.setState(prevState => ({
      n: prevState.n + 1,
    }));

    // add the note to db
    this.db.addNote(note);
  }

  // update the note given the id and new set of fields
  onUpdate = (id, values) => {
    Object.assign(values, { zIndex: (this.state.n + 1) });
    this.db.updateNote(id, values);
  }

  // on view boolean flip to call
  onClear = (bool) => {
    // toggle view all boolean
    this.setState(prevState => ({
      clearAll: !prevState.clearAll,
    }));
    const node = this.myRef.current;
    if (this.state.clearAll) {
      this.state.notes.keySeq().forEach(k => this.onDelete(k));
    } else {
      node.id = 'note-section';
    }
  }

  render() {
    return (
      <div id="Title-Create">
        <button id="clearall-btn" type="submit" onClick={this.onClear}> Clear All </button>
        <img id="Title-Pin" src={require('./img/pin.png')} height="40px" width="50px" alt="pin" />
        <h1 id="Title-Card">My Note Board</h1>
        <InputBar addTitle={this.onAdd} />
        <div ref={this.myRef} id="note-section">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note key={id} id={id} title={note.title} text={note.text} x={note.x} y={note.y} zIndex={note.zIndex} onDelete={this.onDelete} updateNote={this.onUpdate} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
