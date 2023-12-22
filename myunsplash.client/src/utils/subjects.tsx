import { Subject } from "rxjs";

const searchSubject: Subject<string> = new Subject();
const onCreateSubject: Subject<string> = new Subject();
const onDeleteSubject: Subject<string> = new Subject();

export const getSearchValue = () => {
    return searchSubject;
}

export const setSearchValue = (value: string) => {
    searchSubject.next(value);
}

export const onCreate = () => {
    return onCreateSubject;
}

export const dispatchOnCreate = (label: string) => {
    onCreateSubject.next(label);
}

export const onDelete = () => {
    return onDeleteSubject;
}

export const dispatchOnDelete = (label: string) => {
    onDeleteSubject.next(label);
}