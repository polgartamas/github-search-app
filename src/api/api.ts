import axios from 'axios';
import { store } from '../redux/store';
import { addApiUrl } from '../redux/historySlice';

const BASE_URL = 'https://api.github.com';

export interface SearchOptions {
    query: string;
    inFields: string[];
    username?: string;
    organization?: string;
    stars?: string;
    sort?: string;
    order?: string;
    perPage?: number;
    page?: number;
}

const constructApiUrl = (
    baseUrl: string,
    endpoint: string,
    params: Record<string, any>
) => {
    const url = new URL(`${baseUrl}${endpoint}`);
    Object.keys(params).forEach((key) => {
        if (params[key]) {
            url.searchParams.append(key, params[key].toString());
        }
    });
    return url.toString();
};

export const searchRepositories = async (options: SearchOptions) => {
    let queryComponents = [];

    if (options.inFields.includes('name')) {
        queryComponents.push(`${options.query} in:name`);
    }
    if (options.inFields.includes('description')) {
        queryComponents.push(`${options.query} in:description`);
    }
    if (options.inFields.includes('readme')) {
        queryComponents.push(`${options.query} in:readme`);
    }

    let query = queryComponents.join(' AND ');
    console.log('query:', query);

    if (options.username) {
        query += ` user:${options.username}`;
    }
    if (options.organization) {
        query += ` org:${options.organization}`;
    }
    if (options.stars) {
        query += ` ${options.stars}`;
    }
    const queryParams = {
        q: query,
        sort: options.sort,
        order: options.order,
        per_page: options.perPage,
        page: options.page || 1,
    };

    const fullApiUrl = constructApiUrl(
        BASE_URL,
        '/search/repositories',
        queryParams
    );

    store.dispatch(addApiUrl(fullApiUrl));

    try {
        const response = await axios.get(`${BASE_URL}/search/repositories`, {
            params: queryParams,
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error searching repositories:', error);
        throw error;
    }
};
