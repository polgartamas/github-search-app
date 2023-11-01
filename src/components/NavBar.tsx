import React from 'react';
import { Box, Heading, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// This component renders the navigation menu.

const NavBar = () => {
    const location = useLocation();

    return (
        <Box bg="green.500" p={4}>
            <HStack>
                <Heading as="h1" size="lg" color="white" justifyContent="left">
                    GITHUB SEARCH APP
                </Heading>
                <HStack spacing={8} marginLeft="auto" marginRight="auto">
                    <Link
                        as={RouterLink}
                        to="/search"
                        color="white"
                        textDecoration={
                            location.pathname === '/search'
                                ? 'underline'
                                : 'none'
                        }
                    >
                        SEARCH
                    </Link>
                    <Link
                        as={RouterLink}
                        to="/history"
                        color="white"
                        textDecoration={
                            location.pathname === '/history'
                                ? 'underline'
                                : 'none'
                        }
                    >
                        HISTORY
                    </Link>
                </HStack>
            </HStack>
        </Box>
    );
};

export default NavBar;
