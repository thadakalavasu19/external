import React, { Component } from 'react';
import './App.css';

class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      shouldUnmount: false,
    };
    console.log('Constructor: Component is being created');
  }

  componentDidMount() {
    console.log('componentDidMount: Component has been mounted (inserted into DOM)');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate: Component updated');
    console.log('Previous State:', prevState.count, 'Current State:', this.state.count);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount: Component is about to be removed from DOM');
    alert('LifecycleDemo component is being removed!');
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleUnmount = () => {
    // This triggers the unmounting of the component by updating the state
    this.setState({ shouldUnmount: true });
  };

  render() {
    console.log('Render: Rendering the component');

    // If shouldUnmount is true, do not render the component anymore
    if (this.state.shouldUnmount) {
      return null; // This causes the component to not render anymore (simulating unmount)
    }

    return (
      <div style={{ padding: '20px' }}>
        <h2>React Lifecycle Demo</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount} style={{ padding: '8px 12px' }}>
          Increment
        </button>
        <button
          onClick={this.handleUnmount}
          style={{ padding: '8px 12px', marginLeft: '10px' }}
        >
          Unmount Component
        </button>
      </div>
    );
  }
}

export default LifecycleDemo;
