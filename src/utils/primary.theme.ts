import { extendTheme } from '@mui/material';
export const theme = extendTheme({
	components: {
		// MuiButtonBase: {
		// 	defaultProps: {
		// 		disableRipple: true,
		// 	},
		// },
		MuiButton: {
			styleOverrides: {
				root: ({ ownerState, theme }) => {
					return {
						minHeight: '40px',
						textTransform: 'none',
						color: theme.palette.primary.main,
						...(ownerState.variant === 'contained' && {
							backgroundColor: theme.palette.primary.main,
							boxShadow: 'none !important',
							color: `${theme.palette.primary.light} !important`,
							'&:hover': {
								backgroundColor: theme.palette.secondary.main,
							},
							'&.Mui-disabled': {
								backgroundColor: `${theme.palette.secondary.main} !important`,
								color: `${theme.palette.secondary.light} !important`,
							},
						}),
						...(ownerState.variant === 'text' && {
							boxShadow: 'none !important',
							border: '1px solid #e3e9ed!important',
							backgroundColor: '#e3e9ed',
							'&.Mui-disabled': {
								opacity: '0.5',
								color: 'rgba(0, 0, 0, 0.87)',
							},
						}),
						...(ownerState.variant === 'outlined' && {
							border: '1px solid #e3e9ed!important',
							'&.Mui-disabled': {
								borderColor: '#e3e9ed',
								opacity: '0.5',
								color: 'rgba(0, 0, 0, 0.87)',
								backgroundColor: '#e3e9ed',
							},
						}),
						...(ownerState.variant === 'text' &&
							ownerState.role === 'tab' && {
								border: '1px solid transparent!important',
							}),
					};
				},
			},
		},
		MuiRadio: {
			styleOverrides: {
				root: ({ theme }) => {
					return {
						color: theme.palette.primary.main,
					};
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: ({ theme }) => {
					return {
						color: theme.palette.primary.main,
					};
				},
			},
		},
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#000000',
					light: '#ffffff',
					dark: '#000000',
				},
				secondary: {
					main: '#000000c4',
					light: '#D1D5DB',
				},
				text: {
					primary: '#000000',
					secondary: '#ffffff',
					disabled: '#D1D5DB',
				},
			},
		},
		dark: {
			palette: {},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 770,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
});
