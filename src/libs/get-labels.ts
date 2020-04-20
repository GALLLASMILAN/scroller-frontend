import { Article as IArticle } from '../types';
import groupBy from './group-by';

export default (articles: IArticle[], labels: any[]) => {
    if (articles.length === 0) return labels.map(item => ({ label: item, count: null }))

    const parsedLabels = groupBy(articles);
    const missingLabels = labels.filter(label => !parsedLabels.some(parsedLabel => parsedLabel.label === label));

    if (missingLabels.length === 0) return parsedLabels;
    return [
        ...parsedLabels,
        ...missingLabels.map(item => ({ label: item, count: 0 }))
    ];
}