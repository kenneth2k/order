import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { IModalForm } from './Modal.interface';

const ModalForm = (props: IModalForm) => {
	const { size, title, children, isOpen, actionCancel } = props;

	const handleCancel = () => {
		actionCancel && actionCancel();
	};

	return (
		<Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '60%' } }} maxWidth={size ? size : 'xs'} open={isOpen} onClose={handleCancel}>
			<DialogTitle>
				<Typography variant="inherit">{title}</Typography>
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
			</DialogTitle>

			<DialogContent sx={{ padding: 0 }} dividers>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default ModalForm;
