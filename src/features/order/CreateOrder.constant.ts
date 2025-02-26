import * as yup from 'yup';

export const FormProduct = yup
	.object({
		id: yup.string().required(),
		image: yup.string().required(),
		quantity: yup.number().required(),
		price: yup.number().required(),
		title: yup.string().required(),
		discount_type: yup.string(),
		discount_value: yup.number(),
	})
	.required();

export const FormOrderSchema = yup
	.object({
		full_name: yup.string().required('Vui lòng nhập tên khách hàng'),
		email: yup.string().required('Vui lòng nhập email khách hàng').email('Email không đúng định dạng. VD: test@gmail.com'),
		phone: yup.string().nullable().required('Vui lòng nhập số điện thoại khách hàng'),
		items: yup.array().of(FormProduct),
	})
	.required();
