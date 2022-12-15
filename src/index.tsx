import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import GlobalStyles from './components/GlobalStyles';
import { ChakraProvider } from '@chakra-ui/react';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ChakraProvider>
            <GlobalStyles Children={App} />
        </ChakraProvider>
    </Provider>,
);
