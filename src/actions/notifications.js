import {GET_NOTIFICATIONS} from 'Constants/actions'
import {ROUTE_NOTIFICATIONS} from 'Constants/routes'

export const getNotifications = () => ({
    type: GET_NOTIFICATIONS,
    callAPI: ROUTE_NOTIFICATIONS
})
