import { Box, Container, Stack } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function MainLayout() {
	const nav = useNavigate();
	useEffect(() => {
		nav('/order');
	}, []);
	return (
		<Stack minHeight="100vh">
			<Box component="main" flexGrow={1}>
				<Container maxWidth="lg">
					<Outlet />
				</Container>
			</Box>
		</Stack>
	);
}
