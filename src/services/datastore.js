import firebase from 'firebase';

class DataStore {
  constructor(props) {
    const config = {
      apiKey: 'AIzaSyAK0y3tqzZuzRLRlmvPTsQKJ2BiwhUhsYQ',
      authDomain: 'react-notes-c9d13.firebaseapp.com',
      databaseURL: 'https://react-notes-c9d13.firebaseio.com',
      projectId: 'react-notes-c9d13',
      storageBucket: 'react-notes-c9d13.appspot.com',
      messagingSenderId: '426841016227',
    };
    firebase.initializeApp(config);
    this.database = firebase.database();
  }

  // subscrive to value events
  fetchNotes(callback) {
    this.database.ref('notes').on('value', (snapshot) => {
      const newNoteState = snapshot.val();
      callback(newNoteState);
    });
  }

  addNote(note) {
    this.database.ref('notes').push(note);
  }

  deleteNote(id) {
    this.database.ref('notes').child(id).remove();
  }

  updateNote(id, values) {
    this.database.ref('notes').child(id).update(values);
  }
}

export default DataStore;
