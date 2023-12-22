import { useState } from 'react';
import './unsplash.css';
import IUnsplash from '../../utils/models/unsplash';

function Unsplash(props: IUnsplash) {
	const { label, url, onDeleteHandler } = props;
	const [overlap, setOverlap] = useState(false);

	const onMouseEnterHandler = () => {
		setOverlap(true);
	};

	const onMouseLeaveHandler = () => {
		setOverlap(false);
	};

	return (
		<div
			className='unsplash-container'
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
		>
			<div
				className={
					overlap ? 'image-container image-hover' : 'image-container'
				}
			>
				<img src={url} alt='' />
			</div>
			{overlap ? (
				<>
					<button
						className='delete-btn'
						onClick={() => onDeleteHandler(label)}
					>
						Delete
					</button>
					<label htmlFor='' className='unsplash-label'>
						{label}
					</label>
				</>
			) : null}
		</div>
	);
}

export default Unsplash;
