import React from 'react'
import { sum } from 'Utilities'
import './App.css'
import Image from './card.png';
import ButtonComponent from './shared/Button';
// import TestComponent from './TestComponent.jsx';

const TestComponent = lazy(() => import(/*webpackChunkName: "TestComponent" */ './TestComponent.jsx'));

const App = () => {
  // console.log('App URL==============', API_URL);
  const deadFunction = () => {
    console.log('this function is not included on prodBuild but in devBuild')
  }

  console.log('Running App version ' + VERSION);


  const liveFunction = () => {
    console.log('live function')
  }
  return (
    <div className='container'>App{sum(2, 3)}
    <img src={Image} />
    <button onClick={() => liveFunction()}>Click Me</button>
    <ButtonComponent />
    <TestComponent />
    </div>
  )
}

export default App