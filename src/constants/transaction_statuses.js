import approvedIcon from 'Static/transactions/completed.svg'
import declinedIcon from 'Static/transactions/rejected.svg'
import pendingIcon from 'Static/transactions/pending.svg'

export default {
    APPROVED: {
        text: 'донат',
        style: approvedIcon
    },
    PENDING: {
        text: 'донат',
        style: pendingIcon
    },
    DECLINED: {
        text: 'донат',
        style: declinedIcon
    },
    REFUND_APPROVED: {
        text: 'возврат',
        style: approvedIcon
    },
    REFUND_PENDING: {
        text: 'возврат',
        style: pendingIcon
    },
    REFUND_DECLINED: {
        text: 'возврат',
        style: declinedIcon
    },
    PAYOUT_PENDING: {
        text: 'выплата',
        style: pendingIcon
    },
    PAYOUT_DECLINED: {
        text: 'выплата',
        style: declinedIcon
    },
    PAYOUT_APPROVED: {
        text: 'выплата',
        style: approvedIcon
    }
}