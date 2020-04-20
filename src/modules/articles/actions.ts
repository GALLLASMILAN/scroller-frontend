import { IArticle } from './types';
export const setArticles = (articles: IArticle[]) => ({
    type: 'SET_ARTICLES',
    payload: articles
})