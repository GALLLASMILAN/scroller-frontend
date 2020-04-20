import { combineReducers } from 'redux';
import { IRange } from './types';
const range = (state: IRange|null = null, action: any) => action.type === 'SET_DATE_RANGE' 
    ? action.payload : state;

const interval = (state: IRange|null = null, action: any) => action.type === 'SET_DATE_RANGE_INTERVAL' 
    ? action.payload : state;  

const configurationReducer = combineReducers({
    range,
    interval
});

export default configurationReducer;