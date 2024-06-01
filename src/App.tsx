import styles from './App.module.css';
import fetchLatestBooks from './apiCalls/fetchBooksApi';
import Header from './components/Header/header';
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from './components/Navigation/AppRouter';
import SideDrawer from './components/Navigation/SideDrawer';

function App() {
  return (
    // <div className={styles.App}>
    //   <div className={styles.drawerHeaderWrapper}>
    //     <SideDrawer />
    //     <Header />
    //   </div>
    //   <button onClick={fetchLatestBooks}>Click Me</button>
    // </div>
    <Router><AppRouter></AppRouter></Router>
  );
}

export default App;
