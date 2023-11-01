import React from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import HistoryPage from './components/HistoryPage';

function App() {
    return (
        <Box>
            <NavBar />
            <Routes>
                <Route path="/search" element={<SearchPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/">{/* Default Component or Redirect */}</Route>
            </Routes>
        </Box>
    );
}

export default App;
