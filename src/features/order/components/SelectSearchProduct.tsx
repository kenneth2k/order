import { Box, Checkbox, CircularProgress, Divider, Stack, Typography } from '@mui/material';
// import path from 'path';
import { useEffect, useState } from 'react';
import { ICartProductItem, IProduct } from '../CreateOrder.interface';
import { SearchSelect } from '../../../components';
import { ProductAPI } from '../../../api-client';
import { formatVND } from '../../../helper';
import { useDebounce } from '../../../hooks';

const scrolledToEnd = (event: any) => {
	const container = event.target;
	if (container.offsetHeight + container.scrollTop >= container.scrollHeight) {
		return true;
	}
	return false;
};

function ItemProduct(props: { data: IProduct; checked?: boolean; onChecked?: (checked: boolean, id: string) => void }) {
	const { data } = props;
	const [checked, setChecked] = useState(Boolean(props?.checked));

	const handleChecked = () => {
		setChecked(!checked);
		props?.onChecked?.(!checked, data?.id || '');
	};

	return (
		<Stack
			onClick={handleChecked}
			direction="row"
			gap="5px"
			alignItems="center"
			padding="8px 0px"
			sx={{
				cursor: 'pointer',
				'&:hover': {
					backgroundColor: '#f9fafb',
				},
			}}
		>
			<Box>
				<Checkbox checked={checked} size="small" />
			</Box>
			,
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
				<Typography p="0px !important" variant="body2">
					{`${data?.title} - ${Number(formatVND(data.price))}đ`}
				</Typography>
			</Stack>
		</Stack>
	);
}

export function SelectSearchProductComponent(props: { ref: any; onSave?: (selected: ICartProductItem[]) => void }) {
	const { ref } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [valueSearch, setValueSearch] = useState('');
	const [scrollId, setScrollId] = useState<number>(new Date().getTime());
	const debounceScrollById = useDebounce(scrollId);
	const [isNextPage, setIsNextPage] = useState(false);
	const [selected, setSelected] = useState<Array<string>>([]);

	const [data, setData] = useState<{
		products: Array<IProduct>;
		total: number;
		limit: number;
		page: number;
	}>({
		products: [],
		total: 0,
		limit: 20,
		page: 1,
	});

	const handleOnScrollEnd = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (scrolledToEnd(event)) {
			setScrollId(new Date().getTime());
			setIsNextPage(true);
		}
	};

	const handleSearchInput = (value: string) => {
		setIsLoading(true);
		setValueSearch(value);
		setData({
			products: [],
			total: 0,
			limit: 50,
			page: 1,
		});
	};

	const handleSave = () => {
		let productsSelectedNew: any = data.products.filter((product) => {
			if (selected.includes(product.id)) return true;
			return false;
		});

		props?.onSave?.(productsSelectedNew);
		setSelected([]);
	};

	const handleChecked = (checked: boolean, id: string) => {
		if (checked) {
			setSelected([...selected, id]);
		} else {
			setSelected(selected.filter((s) => s !== id));
		}
	};

	useEffect(() => {
		setIsLoading(true);
		setIsNextPage(false);
		if (!isNextPage) {
			ProductAPI.get({ ...(valueSearch && { search: valueSearch }), page: 1, limit: 10 })
				.then((products) => {
					setIsLoading(false);
					if (products?.length) {
						setData({
							products: products,
							page: 1,
							limit: 10,
							total: 0,
						});
					}
				})
				.catch(() => setIsLoading(false));
		} else {
			ProductAPI.get({ ...(valueSearch && { search: valueSearch }), page: data.page + 1, limit: data.limit })
				.then((products) => {
					setIsLoading(false);
					if (products?.length) {
						setData({
							products: [...data.products, ...products],
							page: data.page + 1,
							limit: data.limit,
							total: data.total,
						});
					}
				})
				.catch(() => setIsLoading(false));
		}
	}, [valueSearch, debounceScrollById]);
	return (
		<>
			{ref?.current && (
				<SearchSelect
					onSave={handleSave}
					isActionsPagination={false}
					sx={{
						width: [ref.current.offsetWidth - 28] + 'px !important',
					}}
					searchOptions={{
						onSearchInput: handleSearchInput,
					}}
				>
					<Stack onScroll={handleOnScrollEnd} direction="column" sx={{ height: '300px', overflow: 'auto' }}>
						{!!data?.products?.length &&
							data?.products.map((product, index) => {
								return (
									<Box key={index}>
										<Divider sx={{ margin: 0 }} />
										<ItemProduct onChecked={handleChecked} data={product} />
									</Box>
								);
							})}

						<Stack minHeight={'60px'} direction="row" justifyContent="center" alignItems="center" height="100%">
							{isLoading ? (
								<CircularProgress />
							) : (
								!data?.products?.length && <Typography variant="body1">Không tìm thấy sản phẩm</Typography>
							)}
						</Stack>
					</Stack>
				</SearchSelect>
			)}
		</>
	);
}
