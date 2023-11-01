import React, { useState } from 'react';
import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Text,
    Stack,
    Checkbox,
    Select,
    Divider,
    Link,
    Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

// Data structure for results.
interface Repository {
    id: number;
    full_name: string;
    description: string;
    owner: {
        login: string;
        html_url: string;
        avatar_url: string;
    };
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    created_at: Date;
    watchers: number;
    forks: number;
    html_url: string;
    open_issues: number;
}

// Properties for SearchResults.
interface SearchResultsProps {
    results: Repository[];
    showLinks?: boolean;
    columns?: number;
    orderBy?: string;
    setOrderBy?: (value: string) => void;
    sortDirection?: string;
    setSortDirection?: (value: string) => void;
}

const SearchResults = ({
    results,
    showLinks,
    columns,
    orderBy,
    setOrderBy,
    sortDirection,
    setSortDirection,
}: SearchResultsProps): React.ReactElement | null => {
    console.log('RESULTS:', results);
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const totalPages = Math.ceil(results.length / resultsPerPage);
    const resultsFromStore = useSelector(
        (state: any) => state.search.searchResults
    );

    const handleResultsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setResultsPerPage(Number(event.target.value));
    };
    if (results.length === 0) {
        return null;
    }

    return (
        <Box>
            {resultsFromStore.length > 0 && (
                <Box>
                    {showLinks && (
                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            gap={6}
                            marginTop="30px"
                            marginBottom="30px"
                        >
                            <Stack direction="row" gap={4}>
                                <Text>SORT BY:</Text>
                                <Checkbox
                                    isChecked={orderBy === 'FORKS'}
                                    onChange={() => {
                                        if (setOrderBy) {
                                            setOrderBy('FORKS');
                                        }
                                    }}
                                >
                                    Default
                                </Checkbox>
                                <Checkbox
                                    isChecked={orderBy === 'STARS'}
                                    onChange={() => {
                                        if (setOrderBy) {
                                            setOrderBy('STARS');
                                        }
                                    }}
                                >
                                    Stars
                                </Checkbox>
                            </Stack>
                            <Stack direction="row" gap={4}>
                                <Text>ORDER BY:</Text>
                                <Checkbox
                                    isChecked={sortDirection === 'DESC'}
                                    onChange={() => {
                                        if (setSortDirection) {
                                            setSortDirection('DESC');
                                        }
                                    }}
                                >
                                    Descending
                                </Checkbox>
                                <Checkbox
                                    isChecked={sortDirection === 'ASC'}
                                    onChange={() => {
                                        if (setSortDirection) {
                                            setSortDirection('ASC');
                                        }
                                    }}
                                >
                                    Ascending
                                </Checkbox>
                            </Stack>
                            <Select
                                onChange={handleResultsPerPageChange}
                                width="auto"
                                defaultValue="10"
                            >
                                <option value="5">5 results/page</option>
                                <option value="10">10 results/page</option>
                                <option value="25">25 results/page</option>
                                <option value="50">50 results/page</option>
                            </Select>
                        </Flex>
                    )}
                    <Divider />
                    <SimpleGrid columns={columns} spacing={10} height="100%">
                        {resultsFromStore
                            .slice(
                                (currentPage - 1) * resultsPerPage,
                                currentPage * resultsPerPage
                            )
                            .map((repo: any) => (
                                <Box key={repo.id}>
                                    <Flex
                                        flexDirection="row"
                                        gap={4}
                                        border="solid 1px green"
                                        borderRadius="12px"
                                        minHeight="200px"
                                        padding="5px"
                                    >
                                        <Box>
                                            <Box
                                                flexDirection="column"
                                                width="120px"
                                                gap={4}
                                            >
                                                {showLinks ? (
                                                    <Link
                                                        href={
                                                            repo.owner.html_url
                                                        }
                                                        isExternal
                                                    >
                                                        <Image
                                                            src={
                                                                repo.owner
                                                                    .avatar_url
                                                            }
                                                            boxSize="40px"
                                                        ></Image>
                                                    </Link>
                                                ) : (
                                                    <Image
                                                        src={
                                                            repo.owner
                                                                .avatar_url
                                                        }
                                                        boxSize="40px"
                                                    ></Image>
                                                )}
                                                <Text>
                                                    BY: {repo.owner.login}
                                                </Text>
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Box>
                                                {showLinks ? (
                                                    <Link
                                                        href={repo.html_url}
                                                        isExternal
                                                        fontWeight="bold"
                                                    >
                                                        {repo.full_name}
                                                    </Link>
                                                ) : (
                                                    <Text>
                                                        {repo.full_name}
                                                    </Text>
                                                )}
                                                <Text>{repo.description}</Text>
                                            </Box>
                                            <Flex flexDirection="row" gap={4}>
                                                <Text>
                                                    WATCHERS: {repo.watchers}
                                                </Text>
                                                <Text>FORKS: {repo.forks}</Text>
                                                <Text>
                                                    ISSUES: {repo.open_issues}
                                                </Text>
                                                <Text>
                                                    CREATED AT:{' '}
                                                    {
                                                        new Date(
                                                            repo.created_at
                                                        )
                                                            .toISOString()
                                                            .split('T')[0]
                                                    }
                                                </Text>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </Box>
                            ))}
                    </SimpleGrid>
                    <Flex
                        justifyContent="center"
                        marginTop="10px"
                        alignItems="center"
                    >
                        <Button
                            isDisabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            colorScheme="green"
                        >
                            Previous
                        </Button>
                        <Text mx={4}>
                            Page {currentPage} of {totalPages}
                        </Text>
                        <Button
                            isDisabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            colorScheme="green"
                        >
                            Next
                        </Button>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export default SearchResults;
