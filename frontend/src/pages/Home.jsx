import React from 'react';
import bg from '../assets/ride-bg.jpg';

function Home() {
  return (
    <div
      className="h-[85vh] bg-cover bg-center flex items-center justify-center text-center text-dark"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to LinkRide</h1>
        <p className="text-lg">Connect with fellow students and share rides across campus.</p>
      </div>
    </div>
  );
}

export default Home;