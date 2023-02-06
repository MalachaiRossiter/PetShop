import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import Details from './components/Details';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<DisplayAll/>} path="/" default/>
          <Route element={<Details/>} path="/pet/details/:id"/>
          <Route element={<CreateForm/>} path="/pet/add"/>
          <Route element={<UpdateForm/>} path="/pet/edit/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
