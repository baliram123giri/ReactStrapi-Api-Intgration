
import './App.css';
import Provider from './Provider/Provider';
import Todo from './pages/Todo/Todo';

function App() {
  return (
    <Provider>
      <Todo />
    </Provider>
  );
}

export default App;
