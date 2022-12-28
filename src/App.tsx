import './App.css';
import { useProvider } from 'context/provider';
import { AuthenticatedApp } from 'authenticated-app'
import { UnAuthenticatedApp } from 'unAuthenticated-app'

function App() {
  const { user } = useProvider()

  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
