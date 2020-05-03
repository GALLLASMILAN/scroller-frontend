import { combineReducers } from 'redux';
import { IRange, IDateRangeFilter } from './types';
import { defaultRangeFilterState } from './state';

const range = (state: IRange | null = null, action: any) => action.type === 'SET_DATE_RANGE'
    ? action.payload : state;

const interval = (state: IRange | null = null, action: any) => action.type === 'SET_DATE_RANGE_INTERVAL'
    ? action.payload : state;


const filter = (state: IDateRangeFilter = defaultRangeFilterState, action: any) => {
    if (action.type === 'SET_DATE_RANGE_DEFAULT_CLASS') {
        return {
            ...state,
            defaultClass: action.payload
        }
    } else if (action.type === 'SET_DATE_RANGE_SECONDARY_CLASS') {
        return {
            ...state,
            secondaryClass: action.payload
        }
    } else if (action.type === 'SET_DATE_RANGE_FILTER') {
        return {
            ...state,
            actual: action.payload
        }
    }
    return state;
}

const configurationReducer = combineReducers({
    range,
    interval,
    filter,
});

export default configurationReducer;