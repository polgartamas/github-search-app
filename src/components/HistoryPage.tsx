import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import SearchResults from './SearchResults';

// This component is responsible for rendering the previous searches, and the actual search.

const HistoryPage = () => {
    const urls = useSelector((state: any) => state.history.apiUrls);
    const results = useSelector((state: any) => state.search.searchResults);
    console.log('RESULTSfromHISTORY:', results);
    return (
        <Flex flexDirection="row">
            <Resizable
                defaultSize={{
                    width: '50%',
                    height: 'auto',
                }}
                minWidth="30%"
                maxWidth="90%"
                enable={{ right: true }}
            >
                <Box
                    padding="5"
                    boxShadow="none"
                    rounded="md"
                    bg="white"
                    width="100%"
                    marginTop="40px"
                >
                    <Flex
                        mb="4"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <Heading size="md">Previous Searches</Heading>
                        <Text>total requests: {urls.length} </Text>
                    </Flex>
                    <List spacing={3}>
                        {urls.map((searchTerm: any, index: any) => (
                            <ListItem
                                key={index}
                                border="solid 1px green"
                                borderRadius="12px"
                                padding="5px"
                            >
                                <Text>{JSON.stringify(searchTerm)}</Text>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Resizable>
            <Flex marginTop="40px" flexDirection="column" padding="5">
                {results.length > 0 && (
                    <>
                        <Heading size="md" mb={4}>
                            Actual search result
                        </Heading>
                        <SearchResults
                            results={results}
                            showLinks={false}
                            columns={1}
                        />
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default HistoryPage;
