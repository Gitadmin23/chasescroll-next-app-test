import { create } from 'zustand';

type State = {
    amount: string,
    currency: string
} 

type Action = {
    setAmount: (data: State['amount']) => void,
    setCurrency: (data: State['currency']) => void 
}

const useSettingsStore = create<State & Action>((set) => ({
    amount: "", 
    currency: "NGN",
    setAmount: (data) => set(() => ({ amount: data })),
    setCurrency: (data) => set(() => ({ currency: data })),
}));



export default useSettingsStore