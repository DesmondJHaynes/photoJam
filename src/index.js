import React from 'react';
import ReactDOM from 'react-dom/client';
import { PhotoJam } from './PhotoJam';
import {BrowserRouter} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <PhotoJam />
    </BrowserRouter>
);

