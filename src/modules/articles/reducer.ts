import { IArticle } from './types';

const ArticlesReducer = (state: IArticle[] = [], action: any) => action.type === 'SET_ARTICLES' ? action.payload : state;

export default ArticlesReducer;