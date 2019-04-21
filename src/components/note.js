/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Note 1',
      text: 'Note Text 1',
      x: 20,
      y: 20,
      // id: this.props.id,
      // editMode: false,
    };
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag(e, data) {
    this.setState({ x: data.x, y: data.y });
  }

  render() {
    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 200, y: 200 }}
        position={{ x: this.state.x, y: this.state.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div className="note">
          <div className="note-header">
            <p className="note-title">{this.state.title}</p>
            <div className="note-icons">
              <i className="note-edit fa fa-edit" />
              <i className="note-mover fa fa-map-pin" />
              <i className="note-trash fa fa-minus" />
            </div>
          </div>
          <p className="note-content">{this.state.text}</p>
        </div>
      </Draggable>
    );
  }
}

export default Note;
