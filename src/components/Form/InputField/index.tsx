import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type InputFieldProps = TextFieldProps & {
	control: Control<any>;
	name: string;
	maxLength?: number;
};

export function InputField({ name, control, type, maxLength, ...rest }: InputFieldProps) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				return (
					<TextField
						type={'text'}
						value={value}
						onChange={(event) => {
							let filter = event.target.value.replace(/ +/g, ' ');

							if (type === 'number') {
								event.target.value = filter.replace(/[^0-9]/g, '');
							} else {
								event.target.value = filter;
							}

							if (maxLength && filter.length <= maxLength) {
								onChange(event);
							} else if (!maxLength) {
								onChange(event);
							}
						}}
						onBlur={(event) => {
							let filter = event.target.value.trim();
							event.target.value = filter;
							onChange(event);
						}}
						size="small"
						fullWidth
						{...rest}
						error={!!error}
						helperText={error?.message}
						sx={{
							'& .Mui-error': {
								margin: 0,
								padding: 0,
							},
						}}
					/>
				);
			}}
		/>
	);
}
