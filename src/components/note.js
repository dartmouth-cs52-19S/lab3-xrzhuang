import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'note1',
      notes: this.props.notes,
    };
    this.getTitle = this.getTitle.bind();
    this.getContent = this.getContent.bind();
  }

  getTitle() {
    this.props.displayTitle(this.state.title);
    console.log(this.state.title);
  }

  getContent() {
    this.props.displayContent(this.state.notes);
    console.log(this.state.notes);
  }

  render() {
    return (
      <div>
        <div className="title">{this.state.title}</div>
        <div className="content">{this.state.notes}</div>
      </div>
    );
  }
}

export default Note;
