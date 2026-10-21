import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import SectionBoundary from './SectionBoundary.jsx';
import './styles.css';
if(location.hash&& !location.hash.startsWith('#/') && location.hash!=='#main')history.replaceState(null,'',location.pathname+location.search+'#/'+location.hash.slice(1));
const root=document.getElementById('root');
if(!root)throw new Error('Le point de montage Élan est introuvable.');
createRoot(root).render(<React.StrictMode><SectionBoundary><App/></SectionBoundary></React.StrictMode>);
