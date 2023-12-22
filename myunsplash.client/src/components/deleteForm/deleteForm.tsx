import { FormEvent, useRef, useState } from 'react';
import './deleteForm.css';
import { closeDialog } from '../../utils/dialogService';
import axios, { AxiosError } from 'axios';
import { dispatchOnDelete } from '../../utils/subjects';

interface IDeleteForm {
	label: string;
}

function DeleteForm({ label }: IDeleteForm) {
	const [activeInput, setActiveInput] = useState('');
	const [error, setShowError] = useState('');
	const passwordInputRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
		axios
			.delete(
				`/api/Unsplash/Delete?label=${label}&password=${passwordInputRef.current?.value}`
			)
			.then(() => {
                dispatchOnDelete(label);
				closeDialog();
			})
			.catch((e: AxiosError) => {
				setShowError(e.response?.data + "");
			});
	};

	return (
		<div className='form-container'>
			<h4 className='title'>Are you sure?</h4>
			<form onSubmit={onSubmitHandler}>
				<div
					className={
						activeInput === 'password'
							? 'form-input-container active'
							: 'form-input-container'
					}
				>
					<label htmlFor='password' className={error ? 'error' : ''}>
						Password
					</label>
					<div
						className={
							error ? 'input-container error' : 'input-container'
						}
					>
						<input
							ref={passwordInputRef}
							id='password'
							type='password'
							onFocus={() => setActiveInput('password')}
							onBlur={() => setActiveInput('')}
						/>
					</div>
				</div>
				<div className={error ? 'error' : ''}>{error}</div>
				<div className='actions-container'>
					<button
						className='cancel-button'
						onClick={() => closeDialog()}
					>
						Cancel
					</button>
					<button className='cta-button delete'>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default DeleteForm;
