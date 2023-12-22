interface IUnsplash {
	id: number;
	label: string;
	url: string;
	onDeleteHandler: (label: string) => void;
}

export default IUnsplash;
