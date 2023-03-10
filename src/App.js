import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListSelectedRecord from './components/ListSelectedRecord';
import DisplayAllRecords from './components/DisplayAllRecords';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CreateRecordEntry from './components/CreateRecordEntry';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <HeaderComponent/>
      <Routes>
        <Route path="/"  element={<Home />}>

         {/* <Route path="billable" element={<DisplayAllRecords />} /> */}

        </Route>

        <Route path="add" element={<CreateRecordEntry/>} />

        <Route path="records" element={<ListSelectedRecord />} />

        <Route path="billable" element={<DisplayAllRecords all = {false}/>} />
        
      </Routes>
    <FooterComponent/>
   
    </BrowserRouter>
  );
}

export default App;
