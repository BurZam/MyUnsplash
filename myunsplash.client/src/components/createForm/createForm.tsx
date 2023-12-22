import { FormEvent, useState, useRef } from 'react';
import './createForm.css';
import { closeDialog } from '../../utils/dialogService';
import axios from 'axios';
import { dispatchOnCreate } from '../../utils/subjects';

function CreateForm() {
	const [activeInput, setActiveInput] = useState('');
	const labelInputRef = useRef<HTMLInputElement>(null);
	const urlInputRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();

		axios
			.post('/api/unsplash/new', {
				label: labelInputRef.current?.value,
				url: urlInputRef.current?.value,
			})
			.then(() => {
                dispatchOnCreate(labelInputRef.current!.value);
				closeDialog();
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='form-container'>
			<h4 className='title'>Add a new photo</h4>
			<form onSubmit={onSubmitHandler}>
				<div
					className={
						activeInput === 'label'
							? 'form-input-container active'
							: 'form-input-container'
					}
				>
					<label htmlFor='label'>Label</label>
					<div className='input-container'>
						<input
							ref={labelInputRef}
							id='label'
							type='text'
							placeholder='Suspendisse elit massa'
							onFocus={() => setActiveInput('label')}
							onBlur={() => setActiveInput('')}
						/>
					</div>
				</div>
				<div
					className={
						activeInput === 'url'
							? 'form-input-container active'
							: 'form-input-container'
					}
				>
					<label htmlFor='url'>Photo URL</label>
					<div className='input-container'>
						<input
							ref={urlInputRef}
							id='url'
							type='text'
							placeholder='https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r...'
							onFocus={() => setActiveInput('url')}
							onBlur={() => setActiveInput('')}
						/>
					</div>
				</div>
				<div className='actions-container'>
					<button
						className='cancel-button'
						onClick={() => closeDialog()}
					>
						Cancel
					</button>
					<button className='cta-button'>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default CreateForm;
