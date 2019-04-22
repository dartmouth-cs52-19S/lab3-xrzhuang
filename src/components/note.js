/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
      x: this.props.x,
      y: this.props.y,
      zIndex: this.props.zIndex,
      id: this.props.id,
      editMode: false,
    };
    this.onDrag = this.onDrag.bind(this);
    this.onMin = this.onMin.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onTitle = this.onTitle.bind(this);
    this.onContent = this.onContent.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  onTitle(event) {
    this.setState({ title: event.target.value });
  }

  onContent(event) {
    this.setState({ text: event.target.value });
  }

  onDrag(e, data) {
    this.setState({ x: data.x, y: data.y });
    this.updateNote();
  }

  onMin(event) {
    this.props.onDelete(this.state.id);
  }

  onEdit(event) {
    // flip the edit mode
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }));

    // check the previous state edit mode, if previously it was true, then now it will be false
    // this means that we hit save, and this means we need to update!
    if (this.state.editMode) {
      this.updateNote();
    }
  }

  // give our note some new values, and update that on the id
  updateNote() {
    const values = {
      title: this.state.title,
      text: this.state.text,
      x: this.state.x,
      y: this.state.y,
      zIndex: this.state.zIndex,
    };

    this.props.updateNote(this.state.id, values);
  }

  renderNote() {
    if (this.state.editMode) {
      return (
        <div className="note">
          <div className="note-header">
            <div className="note-icons">
              <i className="note-edit fa fa-save" onClick={this.onEdit} />
              <i className="note-mover fa fa-map-pin" />
              <i className="note-min fa fa-minus" onClick={this.onMin} />
            </div>
            <input className="note-title-edit" placeholder="Edit Title" onChange={this.onTitle} maxLength="15" value={this.state.title} />
          </div>
          <textarea className="note-content-edit" placeholder="Edit Content" onChange={this.onContent} maxLength="300" value={this.state.text} />
        </div>
      );
    } else {
      return (
        <div className="note">
          <div className="note-header">
            <div className="note-icons">
              <i className="note-edit fa fa-edit" onClick={this.onEdit} />
              <i className="note-mover fa fa-map-pin" />
              <i className="note-min fa fa-minus" onClick={this.onMin} />
            </div>
            <p className="note-title">{this.state.title}</p>
          </div>
          <div className="note-content" dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }} />
        </div>
      );
    }
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
        {this.renderNote()}
      </Draggable>
    );
  }
}

export default Note;
