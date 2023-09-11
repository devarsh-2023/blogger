import './App.css';
import Card from './components/Card'
import Post from './components/Post'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { useState } from 'react';


const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Router>
      <Header setSearchValue={setSearchValue} />
      <Routes>
        <Route exact path="/" element={<Card searchValue={searchValue} />} />
        <Route exact path="/post/:postId/:imagePath" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;
