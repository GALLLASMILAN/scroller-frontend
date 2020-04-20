import { IArticle } from './types';
import { IRange } from '../date-configuration/types';

export const filteredArticles = (state: any) => {
    const articles: IArticle[] = state.articles;
    const skipedLabels: string[] = state.configuration.skiped;
    const dateRange: IRange = state.dateConfiguration.range;

    let validArticles = articles.filter(article => !skipedLabels.some(label => label === article.label))
    if (dateRange) {
      validArticles = validArticles.filter(article => article.date.ts >= dateRange.min && article.date.ts <= dateRange.max);
    }
    return validArticles.sort((articleA, articleB) => articleB.date.ts - articleA.date.ts);
  }