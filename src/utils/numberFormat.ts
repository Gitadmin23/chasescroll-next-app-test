import formatter from "format-number"


export const formatNumber = (number: any, prefix = "₦") =>
  formatter({ prefix })(number % 1 !== 0 ? number.toFixed(2) : number)