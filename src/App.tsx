import React from 'react';
import Header from './components/Header';
import NowPlaying from './components/NowPlaying';
import Upcoming from './components/Upcoming';

const App = () => {
  // todo - change the background gradient dependent on the channel
  return (
    <div className='flex flex-col justify-between p-8 fixed inset-0 bg-gradient-to-b from-red-900 to-blue-600'>
      <Header/>
      <NowPlaying/>
      <Upcoming/>
    </div>
  );
}

export default App;
