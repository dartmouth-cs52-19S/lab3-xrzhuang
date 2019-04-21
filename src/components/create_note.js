import React, { Component } from 'react';

class InputBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'New Note Title',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit() {
    this.props.addTitle(this.state.title);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    return (
      <div id="create-note">
        <input id="input-bar" size="50" max="50" onChange={this.onInputChange} value={this.state.title} />
        <button id="submit-btn" type="submit" onClick={this.onSubmit}> Create </button>
      </div>
    );
  }
}

export default InputBar;