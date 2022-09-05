import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Notes from './components/pages/Notes'
import Note from './components/pages/Note'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Notes/>} exact/>
            <Route path="/:id" element={<Note/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;