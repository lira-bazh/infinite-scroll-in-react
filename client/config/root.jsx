import React from 'react'
import PostList from '../components/PostList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./root.scss"

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root