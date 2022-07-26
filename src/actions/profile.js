import { GET_PROFILE } from 'Constants/actions'
import { ROUTE_USER } from 'Constants/routes'

export const getProfile = () => ({
    type: GET_PROFILE,
    callAPI: ROUTE_USER
})
