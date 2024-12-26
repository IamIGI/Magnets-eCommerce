import './styles/global.vars.scss';
import './styles/global.scss';
import MainTemplate from './components/views/MainTemplate/MainTemplate';
import Root from './components/views/Root';

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
      <MainTemplate>
        <Root />
      </MainTemplate>
    </div>
  );
}

export default App;
