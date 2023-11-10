import { create } from 'zustand';

type State = {
    configData: object,
    clientSecret: string,
    modalTab: number
} 

type Action = {
    setConfigData: (data: State['configData']) => void,
    setClientSecret: (data: State['clientSecret']) => void 
    setModalTab: (data: State['modalTab']) => void 
}

const useStripeStore = create<State & Action>((set) => ({
    configData: {} as any, 
    clientSecret: "",
    modalTab: 1,
    setConfigData: (data) => set(() => ({ configData: data })),
    setClientSecret: (data) => set(() => ({ clientSecret: data })),
    setModalTab: (data) => set(() => ({ modalTab: data })),
}));



export default useStripeStore