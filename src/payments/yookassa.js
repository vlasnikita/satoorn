import {HOSTING_ADDRESS} from 'Constants/routes'

const shop_id = '874608'
const secret = 'test_dZ9QAb5lr5_rjrq695lIIXIOupfzWsaxjDwo24O_XQQ'

export async function generateYKPaymentLink (id, donationAmount, title, streamerLogin){
    const url = 'https://api.yookassa.ru/v3/payments'
    
    const auth_header = `${shop_id}:${secret}`.toString('base64')
    const headers = {
        'Content-Type': 'application/json',
        'Credentials': 'include',
        'Authorization': `Basic ${auth_header}`
    }

    const body = {
        amount: {
          value: donationAmount,
          currency: "RUB"
        },
        description: `Повышение челленджа «${title}»`,
        confirmation: {
            type: "redirect",
            return_url: `${HOSTING_ADDRESS}/${streamerLogin}/challenges/${id}`
        }
    }
    
    const res = await fetch(url, {
        method: 'POST',
        headers,
        body
    })
    const json = await res.json()

    console.log('YOOKASSA RESPONSE | PAYMENT OBJECT:')
    console.log(json)

    return json.confirmation_url
}