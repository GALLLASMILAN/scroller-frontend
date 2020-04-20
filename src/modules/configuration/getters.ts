import { IArticle } from '../articles/types';
import { ILabel } from '../configuration/types';

export const getLabelsWithCount = (state: any) => {
    const articles: IArticle[] = state.articles;
    const labels: string[] = state.configuration.labels;
    if (articles.length === 0) return labels.map(item => ({ label: item, count: null }))

    const parsedLabels = groupBy(articles);
    const missingLabels = labels.filter(label => !parsedLabels.some(parsedLabel => parsedLabel.label === label));

    if (missingLabels.length === 0) return parsedLabels;
    return [
        ...parsedLabels,
        ...missingLabels.map(item => ({ label: item, count: 0 }))
    ];
}

const groupBy = (articles: IArticle[]) => {
    return articles.reduce((total: ILabel[], article) => {
        const index = total.findIndex((item: ILabel) => item.label === article.label);
        if (index !== -1) {
            const item = total[index];
            total[index] = { 
                ...item, 
                count: (item.count) 
                    ? item.count + 1 
                    : 1 
            };
        } else {
            total.push({ label: article.label, count: 1 });
        }

        return total;
    }, []);
}