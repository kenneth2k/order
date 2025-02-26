import axios from 'axios';

export interface IDataResponse {
	error: boolean;
	message: string;
	data?: null | any;
	status?: number;
}

export type TQuery = {
	[key: string]: any;
};
export type TData = TQuery;
export type THeader = TQuery;
export type TOption = {
	headers: {
		[key: string]: string;
	};
};

export interface IHttpAxios {
	get: (url: string, query?: any, options?: any) => Promise<any>;
	post: (url: string, data?: any, options?: any) => Promise<any>;
	delete: (url: string, data?: any, options?: any) => Promise<any>;
	put: (url: string, data?: any, options?: any) => Promise<any>;
}
const axiosClient = axios.create({
	baseURL: 'https://67bec439b2320ee050114175.mockapi.io/api',
	timeout: 15 * 1000, // timeout 15s
});

axiosClient.interceptors.response.use(
	function (response) {
		return response?.data;
	},
	async function (error: any) {
		return Promise.reject(error);
	}
);

export const httpAxios: IHttpAxios = {
	get: (url: string, query?: TQuery, options: TOption = { headers: {} }) => {
		let param = query ? new URLSearchParams(query).toString() : null;
		url += param ? '?' + param : '';
		return axiosClient({
			method: 'GET',
			url: url,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
		});
	},
	post: (url: string, data: TData = {}, options: TOption = { headers: {} }) => {
		return axiosClient({
			method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			data: JSON.stringify(data),
		});
	},
	delete: (url: string, data?: TData, options: TOption = { headers: {} }) => {
		return axiosClient({
			method: 'DELETE',
			url: url,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			data: JSON.stringify(data),
		});
	},
	put: (url: string, data: TData = {}, options: TOption = { headers: {} }) => {
		return axiosClient({
			method: 'PUT',
			url: url,
			headers: {
				'Content-Type': 'application/json',
				...options?.headers,
			},
			data: JSON.stringify(data),
		});
	},
};
