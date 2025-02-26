import { HighlightOff, Search } from '@mui/icons-material';
import { Box, InputBase, SxProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';

export interface ISearchComponent {
	inputRef?: any;
	sx?: SxProps;
	sxInput?: SxProps;
	defaultValueSearch?: string;
	onSearchInput?: (value: string) => void;
	onChangeInput?: (value: string) => void;
	onFocus?: (event: any) => void;
}

export function EnchanedSearch(props: ISearchComponent) {
	const [search, setSearch] = useState<string>(props?.defaultValueSearch || '');
	const debouncedValue = useDebounce<string>(search, 500);
	const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		props?.onChangeInput?.(event.target.value);
	};

	useEffect(() => {
		if (debouncedValue !== props?.defaultValueSearch) {
			let valueChange = debouncedValue.trim().replace(/ +/g, ' ');
			setSearch(valueChange);
			props?.onSearchInput?.(valueChange);
		}
	}, [debouncedValue]);

	const handleClearSearch = () => {
		setSearch('');
	};
	const handleFocus = (event: any) => {
		props?.onFocus?.(event);
	};

	return (
		<Box
			sx={{
				border: '1px solid #e3e9ed!important',
				display: 'flex',
				alignItems: 'center',
				padding: '0px 5px',
				borderRadius: '5px',
				height: '40px',
				width: '100%',
				'&:has( > .MuiInputBase-root.Mui-focused) ': {
					border: '1px solid #0052cc!important',
				},
				'& svg': { color: '#6c798f', width: '30px' },
				...props?.sx,
			}}
		>
			<Search />
			<InputBase
				sx={{ ...props?.sxInput, '& input': { padding: 0 } }}
				inputRef={props?.inputRef}
				onFocus={handleFocus}
				value={search}
				onChange={handleChangeSearch}
				fullWidth
				size="small"
				placeholder="Tìm kiếm"
			/>
			{search && <HighlightOff onClick={handleClearSearch} sx={{ fontSize: '20px', cursor: 'pointer' }} />}
		</Box>
	);
}
