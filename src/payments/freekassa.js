import md5 from 'md5'

const merchant_id = 17257
const secret = 'lqEKapouwJ4MUBH'

export function generateFKPaymentLink (sum, challenge_id){
    const url_base = 'https://pay.freekassa.ru/'
    const currency = 'RUB'
    const md5_input = `${merchant_id}:${sum}:${secret}:${currency}:${challenge_id}`
    const signature = md5(md5_input)
    
    const url = `${url_base}?m=${merchant_id}&oa=${sum}&currency=${currency}&o=${challenge_id}&s=${signature}`
    return url
}