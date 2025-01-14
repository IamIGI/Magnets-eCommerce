import './styles/global.vars.scss';
import './styles/global.scss';
import MainTemplate from './components/views/MainTemplate/MainTemplate';
import Root from './components/views/Root';
import { Provider } from 'react-redux';
import store from './state/store.ts';

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
      <Provider store={store}>
        <MainTemplate>
          <Root />
        </MainTemplate>
      </Provider>
    </div>
  );
}

export default App;
