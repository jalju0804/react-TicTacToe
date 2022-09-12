import React from 'react';
import ReactDom from 'react-dom/client';

import TicTaeToe from './Tictactoe';

ReactDom.createRoot(document.querySelector('#root')).render(<TicTaeToe/>);