import { httpAxios, TQuery } from './axios-client';

export const ProductAPI = {
	get: (query: TQuery) => {
		return httpAxios.get('/products', query);
	},
};
