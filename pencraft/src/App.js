import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter'; // Assuming AppRouter is your main router component
import { AuthProvider } from './AuthContext'; // Assuming AuthProvider is your authentication provider


function App() {
  return (
    <Router> {/* Add Router here */}
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
