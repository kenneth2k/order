import { httpAxios, TQuery } from './axios-client';

export const DiscountAPI = {
	get: (query: TQuery) => {
		return httpAxios.get('/discount', query);
	},
};
