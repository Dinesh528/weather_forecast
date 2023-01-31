import React from 'react';
import './App.css';
import Weather from './components/WeatherForecast';

function App() {
  return (
    <div className='container'>
     <h2 className='text-center'>Please Enter City Name</h2>
      <Weather/>
    </div>
  );
}

export default App;
