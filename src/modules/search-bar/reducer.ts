const initState = { text: '' };
const searchBarReducer = (state: any = initState, action: any) => action.type === 'SET_TEXT' 
    ? {
        text: action.payload
    }  
    : state;

export default searchBarReducer;