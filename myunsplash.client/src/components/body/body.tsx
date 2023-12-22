import { useState, useEffect } from 'react';
import axios from 'axios';
import './body.css';
import IUnsplash from '../../utils/models/unsplash';
import Unsplash from '../unsplash/unsplash';
import { getSearchValue, onCreate, onDelete } from '../../utils/subjects';
import { showDialog } from '../../utils/dialogService';
import DeleteForm from '../deleteForm/deleteForm';

function Body() {
	const [data, setData] = useState<IUnsplash[]>();

	useEffect(() => {
		loadData();
		const searchSubscriber = getSearchValue().subscribe((value) =>
			loadData(value)
		);

		const onCreateSubscriber = onCreate().subscribe(() => {
			loadData();
		});

		const onDeleteSubscriber = onDelete().subscribe(() => {
			loadData();
		});

		return () => {
			searchSubscriber.unsubscribe();
			onCreateSubscriber.unsubscribe();
			onDeleteSubscriber.unsubscribe();
		};
	}, []);

	const getDataColumn = (column: number) => {
		const result: IUnsplash[] = [];
		if (data && column - 1 >= 0 && column - 1 < data.length) {
			for (let index = column - 1; index < data.length; index += 3) {
				result.push(data[index]);
			}
		}

		return result;
	};

	const onDeleteHandler = (label: string) => {
		showDialog({
			isVisible: true,
			children: <DeleteForm label={label} />,
		});
	};

	const loadData = (value?: string) => {
		const url = value
			? `/api/unsplash/get?label=${value}`
			: '/api/unsplash/get';

		axios
			.get(url)
			.then((response) => {
				setData(response.data);
				console.log(
					'🚀 ~ file: body.tsx:19 ~ .then ~ response.data:',
					response.data
				);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className='body-container'>
			{data ? (
				<div className='columns-container'>
					<div className='column-1'>
						{getDataColumn(1).map((item) => {
							return (
								<Unsplash
									key={item.id}
									{...item}
									onDeleteHandler={onDeleteHandler}
								/>
							);
						})}
					</div>
					<div className='column-2'>
						{getDataColumn(2).map((item) => {
							return (
								<Unsplash
									key={item.id}
									{...item}
									onDeleteHandler={onDeleteHandler}
								/>
							);
						})}
					</div>
					<div className='column-3'>
						{getDataColumn(3).map((item) => {
							return (
								<Unsplash
									key={item.id}
									{...item}
									onDeleteHandler={onDeleteHandler}
								/>
							);
						})}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Body;
