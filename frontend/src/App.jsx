import React from 'react';
import { Routes, Route } from "react-router-dom";
import UserProfileList from './componants/UserProfileList';
import ProfileDetails from "./componants/ProfileDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserProfileList />} />
      <Route path="/profile/:id" element={<ProfileDetails />} />
    </Routes>
  );
};

export default App;
