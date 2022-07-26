import btcIcon from 'Static/payments/payments-btc.png'
import busdIcon from 'Static/payments/payments-busd.png'
import ethIcon from 'Static/payments/payments-eth.png'
import uniIcon from 'Static/payments/payments-uni.png'
import usdcIcon from 'Static/payments/payments-usdc.png'
import usdtIcon from 'Static/payments/payments-usdt.png'
import wavesIcon from 'Static/payments/payments-waves.png'
import wethIcon from 'Static/payments/payments-weth.png'

export default {
    RUR: '₽',
    USD: '$',
    EUR: '€'
}

export const cryptoCurrencies = {
    BTC: {
        symbol: 'BTC',
        icon: btcIcon,
        name: 'Bitcoin',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },
    ETH: {
        symbol: 'ETH',
        icon: ethIcon,
        name: 'Ethereum',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },
    WETH: {
        symbol: 'WETH',
        icon: wethIcon,
        name: 'Wrapped ETH',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },
    USDT: {
        symbol: 'USDT',
        icon: usdtIcon,
        name: 'Tether',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },
    BUSD: {
        symbol: 'BUSD',
        icon: busdIcon,
        name: 'Binance USD',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },
    USDC: {
        symbol: 'USDC',
        icon: usdcIcon,
        name: 'USD Coin',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },

    WAVES: {
        symbol: 'WAVES',
        icon: wavesIcon,
        name: 'Waves',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    },
    UNI: {
        symbol: 'UNI',
        icon: uniIcon,
        name: 'Uniswap',
        address: 'bc1qd94vs98vt42qmkatz7nwx8cv2w36dn06fznvwl'
    }
}