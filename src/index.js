import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import Note from './components/note';


// test map
// const testMap = {
//   id: {
//     title: 'Note1',
//     text: 'uno',
//     x: 0,
//     y: 0,
//     zIndex: 0,
//   },
//   id2: {
//     title: 'Note2',
//     text: 'dos',
//     x: 50,
//     y: 50,
//     zIndex: 0,
//   },
// };

// test note


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line new-cap
    //   notes: Map(Immutable.fromJS(testMap)),
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
    // this.onDelete = this.onDelete.bind(this);
    // this.onAdd = this.onAdd.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note id={id} key={id} note={note} />
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
