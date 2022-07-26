import {GET_TEMPLATES, SET_TEMPLATES_FILTER} from 'Constants/actions'
import {ROUTE_TEMPLATES} from 'Constants/routes'
import { TEMPLATE_FILTERS } from 'Constants/filters'

export const setTemplatesFilter = filter => ({
    type: SET_TEMPLATES_FILTER,
    payload: filter
})