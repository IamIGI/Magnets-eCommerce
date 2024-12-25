import './styles/global.vars.scss';
import './styles/global.scss';
import { NavBar } from './components/navigation/navBar/NavBar';
import Home from './components/templates/home/Home';
import Footer from './components/footer/Footer';

// Define the interface
export interface ToDoObject {
  userName: string;
  title: string;
  isDone?: boolean;
  date?: string;
  index?: number;
}

function App() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
