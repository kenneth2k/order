import { Box, Grid2, Stack, TextField, Tooltip, Typography, Zoom } from '@mui/material';
import { ICartProductItem, IProduct } from '../CreateOrder.interface';
import { Clear } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { formatVND } from '../../../helper';
import { useDebounce } from '../../../hooks';

function ItemProduct(props: {
	onRemove?: (data: IProduct) => void;
	data: ICartProductItem;
	checked?: boolean;
	onChecked?: (checked: boolean, id: string) => void;
	onChangeQuantity: (quantity: number, id: string) => void;
	onChangePrice: (price: number, id: string) => void;
	onInputDiscountCode: (discountCode: string, id: string) => void;
}) {
	const { onInputDiscountCode, data, onChangeQuantity, onChangePrice } = props;

	const [inputDiscountCode, setInputDiscountCode] = useState<string>(data.discountCode || '');
	const debounceInputDiscountCode = useDebounce<string>(inputDiscountCode);

	const handleRemove = () => {
		props?.onRemove?.(data);
	};

	useEffect(() => {
		onInputDiscountCode(debounceInputDiscountCode, data.id);
	}, [debounceInputDiscountCode]);

	return (
		<>
			<Grid2 size={4}>
				<Stack direction="row" gap="10px" alignItems="center">
					{data?.image ? (
						<Box component="img" src={data?.image} alt={data?.title || ''} width={50} height={50} />
					) : (
						<Box
							sx={{
								width: '50px',
								height: '50px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#fafbfc',
								border: '1px solid #ebecf0',
								'& svg': {
									fill: '#cecece',
								},
							}}
						>
							<svg width="20px" height="20px" viewBox="0 0 20 20">
								<path d="M14 9l-5 5-3-2-5 3v4h18v-6z"></path>
								<path d="M19 0H1C.448 0 0 .448 0 1v18c0 .552.448 1 1 1h18c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1zM8 6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.654 0 3-1.346 3-3S9.654 4 8 4 5 5.346 5 7s1.346 3 3 3zm-6 8v-2.434l3.972-2.383 2.473 1.65c.398.264.925.21 1.262-.126l4.367-4.367L18 13.48V18H2zM18 2v8.92l-3.375-2.7c-.398-.32-.973-.287-1.332.073l-4.42 4.42-2.318-1.545c-.322-.214-.74-.225-1.07-.025L2 13.233V2h16z"></path>
							</svg>
						</Box>
					)}
					<Typography variant="body2">{data?.title || ''}</Typography>
				</Stack>
			</Grid2>
			<Grid2 size={3}>
				<Stack direction="row" alignItems="center" height="100%">
					<TextField
						type={'text'}
						value={formatVND(Number(data.price))}
						onChange={(event) => {
							if (event.target.value.length > 12) return;
							let value = event.target.value.replace(/ +/g, ' ');
							value = value.replace(/[^0-9]/g, '');
							onChangePrice(Number(value), data.id);
						}}
						size="small"
						fullWidth
					/>
				</Stack>
			</Grid2>
			<Grid2 size={2}>
				<Stack direction="row" alignItems="center" height="100%">
					<TextField
						type={'text'}
						value={formatVND(Number(data.quantity))}
						onChange={(event) => {
							let value = event.target.value.replace(/ +/g, ' ');
							value = value.replace(/[^0-9]/g, '');
							onChangeQuantity(Number(value), data.id);
						}}
						onBlur={(event) => {
							let value = event.target.value.replace(/ +/g, ' ');
							value = value.replace(/[^0-9]/g, '');
							onChangeQuantity(Number(value) || 1, data.id);
						}}
						size="small"
						fullWidth
					/>
				</Stack>
			</Grid2>
			<Grid2 size={2}>
				<Stack direction="row" alignItems="center" height="100%">
					<TextField
						type={'text'}
						value={data.discountCode}
						onChange={(event) => {
							let value = event.target.value.replace(/ +/g, '');
							setInputDiscountCode(value);
						}}
						onBlur={(event) => {
							let value = event.target.value.replace(/ +/g, '');
							setInputDiscountCode(value);
						}}
						size="small"
						fullWidth
					/>
				</Stack>
			</Grid2>
			<Grid2 size={1}>
				<Stack direction="row" alignItems="center" height="100%">
					<Tooltip title={'Xóa'} placement="top" TransitionComponent={Zoom} arrow>
						<Clear onClick={handleRemove} sx={{ cursor: 'pointer' }} />
					</Tooltip>
				</Stack>
			</Grid2>
		</>
	);
}

export function ListProductSelected(props: {
	onChangeQuantity: (quantity: number, id: string) => void;
	onInputDiscountCode: (discountCode: string, id: string) => void;
	onChangePrice: (price: number, id: string) => void;
	products: ICartProductItem[];
	onRemoveProductSelected: (id: string) => void;
}) {
	const { onInputDiscountCode, onChangePrice, onChangeQuantity, products, onRemoveProductSelected } = props;
	return (
		<>
			<Grid2 container spacing={2} mb="16px">
				<Grid2 size={4}>Tên sản phẩm</Grid2>
				<Grid2 size={3}>Đơn giá</Grid2>
				<Grid2 size={2}>Số lượng</Grid2>
				<Grid2 size={2}>mã khuyến mãi </Grid2>
				<Grid2 size={1}></Grid2>
			</Grid2>

			<Grid2 container spacing={2}>
				{products?.map((product) => {
					return (
						<ItemProduct
							onInputDiscountCode={onInputDiscountCode}
							onChangePrice={onChangePrice}
							onChangeQuantity={onChangeQuantity}
							onRemove={() => onRemoveProductSelected(product.id)}
							key={product.id}
							data={product}
						/>
					);
				})}
			</Grid2>
		</>
	);
}
