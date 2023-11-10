import { create } from 'zustand';

type State = {
    showModal: boolean,
    open: boolean
} 

type Action = {
    setOpen: (data: State['open']) => void 
    setShowModal: (data: State['showModal']) => void 
}

const useModalStore = create<State & Action>((set) => ({
    open: false, 
    showModal: false,
    setOpen: (data) => set(() => ({ open: data })),
    setShowModal: (data) => set(() => ({ showModal: data })),
}));



export default useModalStore