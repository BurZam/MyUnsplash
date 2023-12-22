import { Subject } from 'rxjs';

export interface IDialogConfig {
	isVisible: boolean;
	children?: JSX.Element;
}

const dialogSubject = new Subject<IDialogConfig>();

export function getDialog() {
	return dialogSubject;
}

export function showDialog(config: IDialogConfig) {
	dialogSubject.next(config);
}

export function closeDialog() {
	dialogSubject.next({ isVisible: false });
}
