import React, { useEffect, useState } from 'react';
import {
    Box,
    Input,
    Checkbox,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Flex,
    Text,
    Spinner,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { searchRepositories, SearchOptions } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import SearchResults from './SearchResults';
import { setSearchResults, setError } from '../redux/searchSlice';

function SearchPage() {
    // Handling the states for the search part.
    const [searchQuery, setSearchQuery] = useState('');
    const [searchIn, setSearchIn] = useState({
        name: true,
        description: false,
        readme: false,
    });
    const [username, setUsername] = useState('');
    const [organization, setOrganization] = useState('');
    const [starsFilter, setStarsFilter] = useState({
        equal: true,
        greaterThan: false,
        lessThan: false,
    });
    const [starsCount, setStarsCount] = useState(0);
    const results = useSelector((state: any) => state.search.searchResults);
    const [orderBy, setOrderBy] = useState('FORKS');
    const [sortDirection, setSortDirection] = useState('DESC');

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    // These hooks ensure to send the API call everytime on order by, or sort by change.
    useEffect(() => {
        if (searchQuery.length >= 3) {
            handleSearch();
        }
        // eslint-disable-next-line
    }, [orderBy]);

    useEffect(() => {
        if (searchQuery.length >= 3) {
            handleSearch();
        }
        // eslint-disable-next-line
    }, [sortDirection]);

    // Setting the stars value.

    let starsValue = '';

    if (starsFilter.equal) {
        starsValue = `stars:${starsCount}`;
    } else if (starsFilter.greaterThan) {
        starsValue = `stars:>=${starsCount}`;
    } else if (starsFilter.lessThan) {
        starsValue = `stars:<${starsCount}`;
    }

    // This function handles the settings for the API call.

    const handleSearch = async () => {
        setIsLoading(true);
        if (searchQuery.length < 3) {
            alert('Please enter minimum 3 characters!');
            setIsLoading(false);
            return;
        }

        const selectedInFields = Object.keys(searchIn).filter(
            (key) => (searchIn as any)[key]
        );

        let sortValue;
        if (orderBy === 'FORKS') {
            sortValue = 'forks';
        } else {
            sortValue = orderBy.toLowerCase();
        }

        const searchOptions: SearchOptions = {
            query: searchQuery,
            inFields: selectedInFields,
            username: username,
            organization: organization,
            stars: starsValue,
            sort: sortValue,
            order: sortDirection.toLowerCase(),
        };

        try {
            const data = await searchRepositories(searchOptions);
            dispatch(setSearchResults(data.items));
            console.log('RESULTS:', results);
        } catch (error) {
            alert('Error during search process!');
            console.error('Error during search:', error);
            dispatch(setError('Error during search process!'));
        } finally {
            setIsLoading(false);
        }
    };

    // It's resetting the actual search.

    const handleReset = () => {
        setSearchQuery('');
        setSearchIn({
            name: true,
            description: false,
            readme: false,
        });
        setUsername('');
        setOrganization('');
        setStarsFilter({
            equal: true,
            greaterThan: false,
            lessThan: false,
        });
        setStarsCount(0);
        dispatch(setSearchResults([]));
        dispatch(setError(''));
        setOrderBy('FORKS');
        setSortDirection('DESC');
    };

    return (
        <Box p={5} marginTop="40px">
            <Stack spacing={4}>
                <Flex flexDirection="row" gap="4" width="60%">
                    <FormControl>
                        <FormLabel>SEARCH BY</FormLabel>

                        <Input
                            placeholder=""
                            value={searchQuery}
                            onChange={(e: any) =>
                                setSearchQuery(e.target.value)
                            }
                        />
                    </FormControl>

                    <Stack
                        direction="row"
                        spacing={4}
                        marginLeft="20px"
                        alignItems="flex-end"
                    >
                        <Text>in</Text>
                        <Checkbox
                            isChecked={searchIn.name}
                            onChange={(e: any) =>
                                setSearchIn((prev) => ({
                                    ...prev,
                                    name: e.target.checked,
                                }))
                            }
                        >
                            name
                        </Checkbox>
                        <Checkbox
                            isChecked={searchIn.description}
                            onChange={(e: any) =>
                                setSearchIn((prev) => ({
                                    ...prev,
                                    description: e.target.checked,
                                }))
                            }
                        >
                            description
                        </Checkbox>
                        <Checkbox
                            isChecked={searchIn.readme}
                            onChange={(e: any) =>
                                setSearchIn((prev) => ({
                                    ...prev,
                                    readme: e.target.checked,
                                }))
                            }
                        >
                            readme
                        </Checkbox>
                    </Stack>
                </Flex>
                <Flex flexDirection="row" gap={4} width="60%">
                    <FormControl>
                        <FormLabel>USERNAME</FormLabel>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>ORGANIZATION</FormLabel>
                        <Input
                            placeholder="Organization"
                            value={organization}
                            onChange={(e: any) =>
                                setOrganization(e.target.value)
                            }
                        />
                    </FormControl>
                </Flex>
                <Flex gap="8" padding="10px">
                    <Flex height="auto" align="center">
                        <StarIcon color="gold" boxSize={4} />
                        <Text
                            ml={2}
                            fontWeight="bold"
                            fontSize="20px"
                            alignItems="center"
                        >
                            stars
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" width="100%">
                        <FormControl>
                            <FormLabel>Number</FormLabel>
                            <Input
                                type="number"
                                width="auto"
                                placeholder=""
                                value={starsCount}
                                onChange={(e: any) =>
                                    setStarsCount(e.target.value)
                                }
                            />
                        </FormControl>

                        <Stack
                            direction="row"
                            spacing={4}
                            marginLeft="20px"
                            alignItems="flex-end"
                        >
                            <Checkbox
                                isChecked={starsFilter.equal}
                                onChange={() =>
                                    setStarsFilter({
                                        equal: true,
                                        greaterThan: false,
                                        lessThan: false,
                                    })
                                }
                            >
                                equal
                            </Checkbox>
                            <Checkbox
                                isChecked={starsFilter.greaterThan}
                                onChange={() =>
                                    setStarsFilter({
                                        equal: false,
                                        greaterThan: true,
                                        lessThan: false,
                                    })
                                }
                            >
                                greater than
                            </Checkbox>
                            <Checkbox
                                isChecked={starsFilter.lessThan}
                                onChange={() =>
                                    setStarsFilter({
                                        equal: false,
                                        greaterThan: false,
                                        lessThan: true,
                                    })
                                }
                            >
                                less than
                            </Checkbox>
                        </Stack>
                    </Flex>
                    <Flex
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        width="50%"
                        gap={4}
                    >
                        <Button colorScheme="green" onClick={handleSearch}>
                            Search
                        </Button>
                        <Button colorScheme="green" onClick={handleReset}>
                            Reset
                        </Button>
                    </Flex>
                </Flex>
            </Stack>
            {isLoading && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundColor="rgba(255, 255, 255, 0.7)"
                >
                    <Spinner size="xl" />
                </Flex>
            )}
            {results.length > 0 && (
                <SearchResults
                    results={results}
                    showLinks={true}
                    columns={2}
                    orderBy={orderBy}
                    setOrderBy={setOrderBy}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                />
            )}
        </Box>
    );
}

export default SearchPage;
