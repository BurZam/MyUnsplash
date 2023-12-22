import { createPortal } from 'react-dom';
import './dialog.css';
import { useEffect, useState } from 'react';
import { getDialog } from '../../utils/dialogService';

function Dialog() {
	const [showDialog, setShowDialog] = useState(false);
	const [children, setChildren] = useState<JSX.Element>();

	useEffect(() => {
		const dialogSubscriber = getDialog().subscribe((config) => {
			setShowDialog(config.isVisible);
			setChildren(config.children);
		});

		return () => {
			dialogSubscriber.unsubscribe();
		};
	}, []);

	const dialog = () => {
		return (
			<div className='dialog-container'>
				<div className='children-container'>
                {children}
                </div>
			</div>
		);
	};

	return showDialog
		? createPortal(dialog(), document.getElementById('root')!)
		: null;
}

export default Dialog;
