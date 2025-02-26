export interface IProduct {
	createdAt: string;
	title: string;
	price: number;
	inventory: number;
	id: string;
	image: string;
}

export interface ICartProductItem extends IProduct {
	discountType?: string;
	discountCode?: string;
	discountValue?: number;
	quantity: number;
}

export interface ICart {
	fullName: string;
	email: string;
	phone: string;
	items: ICartProductItem[];
	isUpdatedItems: number;
	paymentType: 'amount' | 'card';
	refundPays: number;
}
