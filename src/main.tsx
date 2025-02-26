import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from './utils';
import { OrderPage } from './pages/order';
import { ToastContainer } from 'react-toastify';
import { MainLayout } from './features/layout/main';
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path={'/'} element={<MainLayout />}>
						<Route path={'/order'} element={<OrderPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Box
				sx={{
					'& .Toastify__toast-body > div:last-child': {
						fontSize: '14px',
					},
				}}
			>
				<ToastContainer
					position="bottom-center"
					autoClose={1000}
					limit={3}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
			</Box>
		</ThemeProvider>
	</StrictMode>
);
