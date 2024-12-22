import './styles/global.vars.scss';
import './styles/global.scss';
import { NavBar } from './components/navigation/navBar/NavBar';

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
    <div className="wrapper">
      <NavBar />
      <h1>Home</h1>
    </div>
  );
}

export default App;
