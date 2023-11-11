
export const formatNumberWithK = (number: any) =>{
    if(number === 0 || !number) {
        return 0
    } else {
        return number > 999 ? `${Math.trunc(number / 1000)}k` : number
    }
}