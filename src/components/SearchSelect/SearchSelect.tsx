import { Box, Button, ClickAwayListener, Divider, Fade, Paper, Popper, PopperPlacementType, Stack } from '@mui/material';
import { useState } from 'react';
import { EnchanedSearch } from '../EnchanedSearch';

export function SearchSelect(props: any) {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [placement, setPlacement] = useState<PopperPlacementType>();

	const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
		setPlacement(newPlacement);
	};

	const handleClickAway = () => {
		setOpen(false);
	};

	const handleSave = () => {
		setOpen(false);
		props?.onSave?.();
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box>
				<Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorEl} placement={placement} transition>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={0}>
							<Paper
								elevation={3}
								sx={{
									margin: '5px 0px',
									'& .MuiTypography-root': {
										padding: '10px',
										paddingLeft: '16px',
										'&.default': {
											padding: '0px',
										},
									},
									marginLeft: '-36px !important',
									marginTop: '11px !important',
									...(props.sx && { ...props.sx }),
								}}
							>
								<Box>
									{props?.children}
									<Divider />

									<Stack direction="row" justifyContent="flex-end" alignItems="center" padding="10px">
										<Box
											sx={{
												minWidth: '44px',
												height: '38px',
												padding: '0px',
												backgroundColor: '#e3e9ed!important',
												'&:hover': {
													backgroundColor: '#c2cdd8!important',
												},
											}}
										>
											<Button onClick={handleSave} disabled={Boolean(props.disabledSave)} variant="contained">
												{props?.btnSaveTitle || 'Hoàn tất chọn'}
											</Button>
										</Box>
									</Stack>
								</Box>
							</Paper>
						</Fade>
					)}
				</Popper>
				<Box sx={{ width: '100%', display: 'block' }}>
					<EnchanedSearch
						sxInput={{ fontSize: '14px', padding: 0 }}
						onFocus={handleClick('bottom-start')}
						sx={{
							height: '40px',
							width: '100%',
						}}
						{...(props?.searchOptions && { ...props?.searchOptions })}
					/>
				</Box>
			</Box>
		</ClickAwayListener>
	);
}
