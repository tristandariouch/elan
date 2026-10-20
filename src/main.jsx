import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import SectionBoundary from './SectionBoundary.jsx';
import './styles.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><SectionBoundary><App/></SectionBoundary></React.StrictMode>);
