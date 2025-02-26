import { Box, Button, Divider, FormControlLabel, Grid2, Paper, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { ListProductSelected } from './components/ListProductSelected';
import { SelectSearchProductComponent } from './components/SelectSearchProduct';
import { ICart } from './CreateOrder.interface';
import { formatVND } from '../../helper';
import { ConfirmOrder } from './components/ConfirmOrder';
import { DiscountAPI } from '../../api-client/discount.api';

export function CreateOrder() {
	const refProduct = useRef<any>(null);
	const [order, setOrder] = useState<ICart>({
		full_name: '',
		email: '',
		phone: '',
		items: [],
		isUpdatedItems: new Date().getTime(),
		paymentType: 'amount',
		customerPays: 0,
	});

	const [isModal, setIsModal] = useState(false);

	const totalSumQtyProduct = useMemo(() => {
		return order.items.reduce((previousValue, currentValue) => {
			return previousValue + currentValue.quantity;
		}, 0);
	}, [order.isUpdatedItems]);

	const totalSumPriceProduct = useMemo(() => {
		return order.items.reduce((previousValue, currentValue) => {
			return Number(previousValue) + Number(currentValue.price) * Number(currentValue.quantity);
		}, 0);
	}, [order.isUpdatedItems]);

	const handleRemoveProductSelected = (id: string) => {
		let orderNew = _.cloneDeep(order);
		let productsSelectedNew = orderNew.items.filter((p) => p.id !== id);
		orderNew.items = productsSelectedNew;
		orderNew.isUpdatedItems = new Date().getTime();
		setOrder(orderNew);
	};

	const handleChangeQuantity = (quantity: number, id: string) => {
		let orderNew = _.cloneDeep(order);
		let idx = orderNew.items.findIndex((p) => p.id === id);
		if (idx > -1) {
			orderNew.items[idx].quantity = quantity;
			orderNew.isUpdatedItems = new Date().getTime();
		}
		setOrder(orderNew);
	};
	const handleChangePrice = (price: number, id: string) => {
		let orderNew = _.cloneDeep(order);
		let idx = orderNew.items.findIndex((p) => p.id === id);
		if (idx > -1) {
			orderNew.items[idx].price = Number(price);
			orderNew.isUpdatedItems = new Date().getTime();
		}
		setOrder(orderNew);
	};
	const handleInputDiscountCode = (discount_code: string, id: string) => {
		if (!discount_code.replace(/ +/g, '').length) return;

		DiscountAPI.get({
			search: discount_code,
		})
			.then((data) => {
				if (data?.length) {
					let discount = data[0];

					let orderNew = _.cloneDeep(order);
					let idx = orderNew.items.findIndex((p) => p.id === id);
					if (idx > -1) {
						orderNew.items[idx].discount_code = discount.code;
						orderNew.items[idx].discount_type = discount.type;
						orderNew.items[idx].discount_value = discount.value;

						if (discount.type === 'percent') {
							let percent = Number(discount.value) / 100;
							orderNew.items[idx].price = Number(orderNew.items[idx].price) - Number(orderNew.items[idx].price) * percent;
						} else if (discount.type === 'fixed_amount') {
							orderNew.items[idx].price = Number(orderNew.items[idx].price) - Number(discount.value);
						}

						orderNew.isUpdatedItems = new Date().getTime();
					}
					setOrder(orderNew);
				}
			})
			.catch((err) => {});
	};

	return (
		<Box sx={{ backgroundColor: '#F5F5F5', p: '20px' }}>
			<Typography component="h5" variant="h5" mb="10px">
				Thông tin đơn hàng
			</Typography>
			<Grid2 container spacing={2}>
				<Grid2 size={8}>
					<Stack direction="column" gap="20px">
						<Paper elevation={1}>
							<Typography p="14px">Khách hàng</Typography>
							<Divider />
							<Grid2 container spacing={2} p="14px">
								<Grid2 size={6}>
									<TextField
										value={order.full_name}
										placeholder="Nhập tên khách hàng"
										onChange={(event) => {
											let value = event.target.value.replace(/ +/g, ' ');
											let orderNew = _.cloneDeep(order);
											orderNew.full_name = value;
											setOrder(orderNew);
										}}
										size="small"
										fullWidth
									/>
								</Grid2>
								<Grid2 size={6}>
									<TextField
										value={order.email}
										placeholder="Nhập email khách hàng"
										onChange={(event) => {
											let value = event.target.value.replace(/ +/g, ' ');
											let orderNew = _.cloneDeep(order);
											orderNew.email = value;
											setOrder(orderNew);
										}}
										size="small"
										fullWidth
									/>
								</Grid2>
								<Grid2 size={12}>
									<TextField
										value={order.phone}
										placeholder="Nhập số điện thoại khách hàng"
										onChange={(event) => {
											if (event.target.value.length > 10) return;
											let value = event.target.value.replace(/ +/g, ' ');
											value = value.replace(/[^0-9]/g, '');
											let orderNew = _.cloneDeep(order);
											orderNew.phone = value;
											setOrder(orderNew);
										}}
										size="small"
										fullWidth
									/>
								</Grid2>
							</Grid2>
						</Paper>
						<Paper elevation={1}>
							<Typography p="14px">Sản Phẩm</Typography>
							<Divider />
							<Box p="14px" ref={refProduct}>
								<SelectSearchProductComponent
									ref={refProduct}
									onSave={(selected: any) => {
										let orderNew = _.cloneDeep(order);
										for (const element of selected) {
											let idx = orderNew.items.findIndex((p) => p.id === element.id);
											if (idx > -1) {
												orderNew.items[idx].quantity += 1;
											} else {
												orderNew.items.push({ ...element, quantity: 1 });
											}
										}
										orderNew.isUpdatedItems = new Date().getTime();
										setOrder(orderNew);
									}}
								/>
							</Box>
							<Box p="14px">
								<ListProductSelected
									onChangeQuantity={handleChangeQuantity}
									onChangePrice={handleChangePrice}
									onInputDiscountCode={handleInputDiscountCode}
									products={order.items}
									onRemoveProductSelected={handleRemoveProductSelected}
								/>
							</Box>
						</Paper>
					</Stack>
				</Grid2>
				<Grid2 size={4}>
					<Paper elevation={1}>
						<Typography p="14px">Thanh toán</Typography>
						<Divider />
						<Stack direction="column" p="14px" gap="10px">
							<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
								<Box>Số lượng sản phẩm</Box>
								<Box>{totalSumQtyProduct}</Box>
							</Stack>
							<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
								<Box>Tổng tiền hàng</Box>
								<Box>{formatVND(totalSumPriceProduct)}đ</Box>
							</Stack>

							<RadioGroup
								value={order.paymentType}
								onChange={(event) => {
									let orderNew = _.cloneDeep(order);
									orderNew.paymentType = event.target.value as any;
									setOrder(orderNew);
								}}
							>
								<FormControlLabel value="amount" control={<Radio size="small" />} label="Tiền mặt" />
								<FormControlLabel value="card" control={<Radio size="small" />} label="Thẻ" />
							</RadioGroup>

							{order.paymentType === 'amount' && (
								<>
									<Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
										<Box>Khách trả</Box>
										<Box>
											<TextField
												value={order.customerPays === 0 ? '' : formatVND(order.customerPays)}
												placeholder="Nhập số tiền"
												onChange={(event) => {
													let value = event.target.value.replace(/ +/g, ' ');
													value = value.replace(/[^0-9]/g, '');
													let orderNew = _.cloneDeep(order);
													orderNew.customerPays = event.target.value as any;
													setOrder(orderNew);
												}}
												size="small"
												fullWidth
											/>
										</Box>
									</Stack>
									<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
										<Box>tiền thừa trả khách</Box>
										<Box>
											{Number(String(order.customerPays).replace(/[^0-9]/g, '')) - totalSumPriceProduct < 0
												? 0
												: (Number(String(order.customerPays).replace(/[^0-9]/g, '')) - totalSumPriceProduct).toFixed(0)}
											đ
										</Box>
									</Stack>
								</>
							)}
						</Stack>
						<Divider />
						<Stack direction="row" justifyContent="flex-end" p="14px">
							<Button type="submit" variant="contained" onClick={() => setIsModal(true)}>
								Thanh toán
							</Button>
						</Stack>
					</Paper>
				</Grid2>
			</Grid2>
			<ConfirmOrder order={order} isModal={isModal} setModal={(modal) => setIsModal(modal)} />
		</Box>
	);
}
