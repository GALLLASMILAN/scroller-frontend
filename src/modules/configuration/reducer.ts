import { combineReducers } from 'redux';

const labels = (state: any = [], action: any) => action.type === 'SET_LABELS' 
    ? action.payload : state;

const skiped = (state: any = [], action: any) => action.type === 'SET_SKIPED_LABELS' 
    ? action.payload : state;  

const configurationReducer = combineReducers({
    labels,
    skiped
});

export default configurationReducer;