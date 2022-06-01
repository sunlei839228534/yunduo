import React from 'react';
import './App.css';
import { useAuth } from 'context/auth';
import { AuthenticatedApp } from 'authenticated-app'
import { UnAuthenticatedApp } from 'unAuthenticated-app'

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
