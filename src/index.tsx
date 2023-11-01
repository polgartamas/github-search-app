import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        green: {
            500: '#4CAF50',
        },
    },
    components: {
        Checkbox: {
            baseStyle: {
                control: {
                    _checked: {
                        bg: 'green.500',
                        borderColor: 'green.500',
                        color: 'white',
                    },
                    _hover: {
                        borderColor: 'green.500',
                        _checked: {
                            bg: 'green.600',
                        },
                    },
                },
            },
        },
    },
});

const root = document.getElementById('root');
// @ts-ignore
const appRoot = ReactDOM.createRoot(root);

appRoot.render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </ChakraProvider>
);
