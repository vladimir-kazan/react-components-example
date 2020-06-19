import React from 'react';
import 'react-components-example/build/bundle.css';
import './App.css';
import { DemoComponent } from 'react-components-example';

// import { DemoComponent } from 'react-components-example/build/DemoComponent';

// import TestComponent from 'react-component-library/build/TestComponent/TestComponent'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="myClass">Test with the same class name</div>
        <DemoComponent title="Nice!" />
        <DemoComponent />
        {/* <AnotherComponent /> */}
      </header>
    </div>
  );
}

export default App;
