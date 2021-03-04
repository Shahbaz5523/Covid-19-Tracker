import './App.css';
import {useState} from 'react';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import CountryContext from './components/CountryContext/CountryContext';

function App() {
  let initialContext = useState();
  return (
      <CountryContext.Provider value={initialContext}>
        <div className="App">
            <Header/> 
            <MainGrid/>
        </div>
      </CountryContext.Provider>
  );
}

export default App;
