import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from './components/Navigation/AppRouter';
import SideNavigation from './components/Navigation/SideNavigation';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <SideNavigation />
      <AppRouter />
    </Router>
  );
}

export default App;
