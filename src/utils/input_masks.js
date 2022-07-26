export const numbersMask = input => input.toString().split(/\D/).join('')
export const floatMask = input => input.toString().split(/[^\d.,]/).join('')
