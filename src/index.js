import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from '@testing-library/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
  Render is called on each update.
  Render Clock into saem DOM node, only a single instance of Clock is used
  Setup timer when Clock is rendered first time in DOm. Called Mounting
  Clear that time when the clock is removed from DOM. Called unmounting
  Mounting and Unmounting are called lifecycle methods
  componentDidMount -> runs after the component output is rendered in DOM
  this.props. is set by React.
  this.state is free to allow manual feilds, if u want outside dataflow

  Clock goes to root.render -> Constructor is called, initalizing state
  React calls Clocks render -> React updates DOM with data inside
  Clock outputs and calls componentDidMount -> Clock sets up a timer calling tick()
  tick gets called every second -> UI update calling setState, react knows state changed and calls render
  clock is removed from DOM -> componentWillUnmount is called
*/
class Clock extends React.Component {
constructor(props) {
  super(props);
  this.state = {date: new Date()};
}

componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}

componentWillUnmount() {
  clearInterval(this.timerID)
}

tick() {
  this.setState({
    date: new Date()
  });
}

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

root.render(<Clock />);


/*
Handling Events
you dont call addEventListener. Just provide a listener when the element is rendered
*/

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.')
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

/*
  Common for event-handler to be a method on a class.
  Toggle component renders a button. User can toggle between ON and OFF

*/
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    }

    // neccessary binding to make this work in the callback
    // in javaScript class methods are not bound by default. without this `this` wont work in the functions
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick= {this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}
root.render(<Toggle />)
reportWebVitals();
