export interface IProduct {
	createdAt: string;
	title: string;
	price: number;
	inventory: number;
	id: string;
	image: string;
}

export interface ICartProductItem extends IProduct {
	discount_type?: string;
	discount_code?: string;
	discount_value?: number;
	quantity: number;
}

export interface ICart {
	full_name: string;
	email: string;
	phone: string;
	items: ICartProductItem[];
	isUpdatedItems: number;
	paymentType: 'amount' | 'card';
	customerPays: number;
}
