import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { IModalConfirm } from './Modal.interface';
import useStyles from './ModalConfirm.style';

const ModalConfirm = (props: IModalConfirm) => {
	const {
		showAllBtn = true,
		actionBtnType,
		size,
		title,
		children,
		isOpen,
		titleBtnConfirm,
		disableConfirm,
		actionConfirm,
		titleBtnCancel,
		disableCancel,
		titleBtnDelete,
		disableDelete,
		actionCancel,
		actionCancelButton,
		actionCancelBackground,
		showBtnClose = true,
		alignTitle,
		sx: sxProps,
		sxActions,
	} = props;

	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleCancel = () => {
		actionCancel && actionCancel();
	};

	const handleCancelButton = () => {
		actionCancelButton && actionCancelButton();
	};

	const handleOk = () => {
		actionConfirm && actionConfirm();
	};

	return (
		<Dialog
			className={classes.root}
			fullScreen={fullScreen}
			open={isOpen}
			onClose={() => {
				if (actionCancelBackground) {
					actionCancelBackground();
				} else {
					handleCancel();
				}
			}}
			maxWidth={size}
			sx={sxProps}
		>
			<DialogTitle>
				<Typography
					variant="inherit"
					sx={{
						textAlign: alignTitle || 'left',
					}}
				>
					{title}
				</Typography>
				{showBtnClose && (
					<IconButton
						aria-label="close"
						onClick={handleCancel}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: 'secondary.main',
						}}
					>
						<CloseIcon />
					</IconButton>
				)}
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
};

export default ModalConfirm;

ModalConfirm.defaultProps = {
	titleBtnConfirm: 'Okay',
	disableConfirm: false,
	disableCancel: false,
};
