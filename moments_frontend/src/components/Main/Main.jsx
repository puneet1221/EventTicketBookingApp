import React from 'react';

import { CategoryEvents } from './CategoryEvents';
import './main.css';


const Main = ({eventsList}) => {
  return (
    <div className="main-container p-6">
      <CategoryEvents eventsList={eventsList} title="Top Picks near you!"></CategoryEvents>
    </div>
  );
};

export default Main;
