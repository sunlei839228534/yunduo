import React from 'react';
import './App.css';
import { useAuth } from 'context/auth';
import { AuthenticatedApp } from 'authenticated-app'

function App() {
  return (
    <div className="App">
      <AuthenticatedApp />
    </div>
  );
}

export default App;
