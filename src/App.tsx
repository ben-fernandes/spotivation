import React from 'react';
import Header from './components/Header';
import NowPlaying from './components/NowPlaying';
import Upcoming from './components/Upcoming';

const App = () => {
  return (
    <>
      <Header/>
      <NowPlaying/>
      <Upcoming/>
    </>
  );
}

export default App;
