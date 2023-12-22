import { useRef, useState } from 'react';
import Logo from '../icons/logo';
import Search from '../icons/search';
import './header.css';
import { setSearchValue } from '../../utils/subjects';
import { showDialog } from '../../utils/dialogService';
import CreateForm from '../createForm/createForm';

function Header() {
	const searchRef = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className='header-container'>
			<Logo />
			<div
				className={
					isFocused
						? 'search-container search-container-focused'
						: 'search-container'
				}
			>
				<Search />
				<input
					ref={searchRef}
					type='text'
					className='search-input'
					placeholder='Search by name'
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(args) =>
						setSearchValue(args.currentTarget.value)
					}
				/>
			</div>
			<button
				className='cta-button'
				onClick={() =>
					showDialog({
						isVisible: true,
						children: (
							<CreateForm/>
						),
					})
				}
			>
				Add a photo
			</button>
		</div>
	);
}

export default Header;
