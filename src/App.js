import './App.css';
import Card from './components/Card'
import Post from './components/Post'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Card />} />
        <Route exact path="/post/:postId/:imagePath" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
