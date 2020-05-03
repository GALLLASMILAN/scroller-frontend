import { IArticle } from './types';
import { IRange, IDateRangeFilter } from '../date-configuration/types';

export const filteredArticles = (state: any) => {
  const articles: IArticle[] = state.articles;
  const skipedLabels: string[] = state.configuration.skiped;
  const dateRange: IRange = state.dateConfiguration.range;
  const interval: IRange = state.dateConfiguration.interval;
  const dateRangeFilter: IDateRangeFilter = state.dateConfiguration.filter;

  let validArticles = articles.filter(article => !skipedLabels.some(label => label === article.label))
  if (dateRange) {
    validArticles = validArticles.filter(article => article.date.ts >= dateRange.min && article.date.ts <= dateRange.max);
  }
  if (dateRangeFilter && interval) {
    const filter = dateRangeFilter.filters.find(filter => filter.id === dateRangeFilter.actual);
    if (filter) {
      const tsMin = filter.tsFrom(interval.max);
      validArticles = validArticles.filter(article => article.date.ts >= tsMin);
    }
  }
  return validArticles.sort((articleA, articleB) => articleB.date.ts - articleA.date.ts);
}