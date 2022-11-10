import { makeAutoObservable } from "mobx"

interface Modals {
    open: boolean,
    content: JSX.Element | null,
}

export default class ModalsStore {
    modal: Modals = {
        open: false,
        content: null,
    }

    constructor() {
        makeAutoObservable(this);
    }

    openForm = (jsx: JSX.Element) => {
        this.modal.open = true;
        this.modal.content = jsx;
    }
    
    closeForm = () => {
        this.modal.open = false;
        this.modal.content = null;
    }
}