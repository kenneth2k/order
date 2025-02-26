import { Box, Divider, Grid2, Paper, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { IModalConfirm, ModalConfirm } from '../../../components/Modal';
import { formatVND } from '../../../helper';
import { ICart, ICartProductItem } from '../CreateOrder.interface';
interface IModalCustomerOption {
	info: IModalConfirm;
}

function ItemProduct(props: { data: ICartProductItem }) {
	const { data } = props;

	return (
		<>
			<Grid2 size={5}>
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
					{formatVND(Number(data.price))}
				</Stack>
			</Grid2>
			<Grid2 size={2}>
				<Stack direction="row" alignItems="center" height="100%">
					{formatVND(Number(data.quantity))}
				</Stack>
			</Grid2>
			<Grid2 size={2}>
				<Stack direction="row" alignItems="center" height="100%">
					{data.discountCode}
				</Stack>
			</Grid2>
		</>
	);
}

export function ConfirmOrder(props: { order: ICart; isModal: boolean; setModal: (isModal: boolean) => void }) {
	const { order, isModal, setModal } = props;

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

	const modalOption: IModalCustomerOption = {
		info: {
			disableCancel: false,
			size: 'lg',
			title: 'Thông tin đơn hàng',
			isOpen: isModal,
			actionCancel: () => {
				setModal(false);
			},
		},
	};

	return (
		<ModalConfirm {...modalOption.info}>
			<Box sx={{ p: '16px' }}>
				<Grid2 container spacing={2}>
					<Grid2 size={8}>
						<Stack direction="column" gap="20px">
							<Paper elevation={1}>
								<Typography p="14px">Khách hàng</Typography>
								<Divider />
								<Grid2 container spacing={1.5} p="14px">
									<Grid2 size={3}>Họ tên: </Grid2>
									<Grid2 size={9}>{order.fullName}</Grid2>
									<Grid2 size={3}>Email:</Grid2>
									<Grid2 size={9}>{order.email}</Grid2>
									<Grid2 size={3}>Số điện thoại:</Grid2>
									<Grid2 size={9}>{order.phone}</Grid2>
								</Grid2>
							</Paper>
							<Paper elevation={1}>
								<Typography p="14px">Sản Phẩm</Typography>
								<Divider />

								<Box p="14px">
									<Grid2 container spacing={2} mb="16px">
										<Grid2 size={5}>Tên sản phẩm</Grid2>
										<Grid2 size={3}>Đơn giá</Grid2>
										<Grid2 size={2}>Số lượng</Grid2>
										<Grid2 size={2}>mã khuyến mãi </Grid2>
									</Grid2>

									<Grid2 container spacing={2}>
										{order.items?.map((product) => {
											return <ItemProduct key={product.id} data={product} />;
										})}
									</Grid2>
								</Box>
							</Paper>
						</Stack>
					</Grid2>
					<Grid2 size={4}>
						<Paper elevation={1}>
							<Typography p="14px">Thông tin thanh toán</Typography>
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

								<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
									<Box>Phương thức thanh toán</Box>
									<Box>{order.paymentType === 'amount' ? 'Tiền mặt' : 'Thẻ'}</Box>
								</Stack>

								{order.paymentType === 'amount' && (
									<>
										<Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
											<Box>Khách trả</Box>
											<Box>{formatVND(order.refundPays)}đ</Box>
										</Stack>
										<Stack direction="row" justifyContent="space-between" flexWrap="wrap">
											<Box>tiền thừa trả khách</Box>
											<Box>
												{Number(String(order.refundPays).replace(/[^0-9]/g, '')) - totalSumPriceProduct < 0
													? 0
													: formatVND(Number(String(order.refundPays).replace(/[^0-9]/g, '')) - totalSumPriceProduct)}
												đ
											</Box>
										</Stack>
									</>
								)}
							</Stack>
							<Divider />
						</Paper>
					</Grid2>
				</Grid2>
			</Box>
		</ModalConfirm>
	);
}
