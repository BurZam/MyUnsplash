import { Profiler, useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/header';
import Body from './components/body/body';
import { onRenderHandler } from './utils/profiler';
import { getDialog } from './utils/dialogService';
import Dialog from './components/dialog/dialog';

function App() {

	useEffect(() => {
	}, []);

	return (
		<div>
			<Profiler id='Header' onRender={onRenderHandler}>
				<Header />
			</Profiler>
			<Profiler id='Body' onRender={onRenderHandler}>
				<Body />
			</Profiler>
			<Dialog/>
		</div>
	);
}

export default App;
