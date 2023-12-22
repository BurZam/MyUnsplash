import React, { Profiler } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { onRenderHandler } from './utils/profiler.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Profiler id='App' onRender={onRenderHandler}>
				<App />
			</Profiler>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
