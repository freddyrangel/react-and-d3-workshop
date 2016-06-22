import React      from 'react';
import { render } from 'react-dom';
import App        from './components/app';

const mountPoints = Array.from(document.querySelectorAll('.alphabet'));

mountPoints.forEach((el) => render(<App/>, el));
