import { SxProps, Theme } from '@mui/material';
import { ReactElement } from 'react';

export interface IModalConfirm {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	sx?: Record<string, SxProps<Theme> | undefined>;
	sxActions?: Record<string, SxProps<Theme> | undefined>;
	title: string;
	children?: ReactElement;
	isOpen: boolean;
	titleBtnConfirm?: string;
	disableConfirm?: boolean;
	actionConfirm?: () => void;
	titleBtnCancel?: string;
	disableCancel?: boolean;
	titleBtnDelete?: string;
	disableDelete?: boolean;
	actionCancel?: () => void;
	actionCancelBackground?: () => void;
	actionCancelButton?: () => void;
	showAllBtn?: boolean;
	actionBtnType?: number;
	showBtnClose?: boolean;
	alignTitle?: 'left' | 'center' | 'right';
}

export interface IModalForm {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	title: string;
	children?: ReactElement;
	isOpen: boolean;
	actionCancel?: () => void;
}
