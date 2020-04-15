import { Article } from '../types';

type GroupLabel = {
    label: string;
    count: number;
}
export default (articles: Article[]) => {
    return articles.reduce((total: GroupLabel[], article) => {
        const index = total.findIndex((item: GroupLabel) => item.label === article.label);
        if (index !== -1) {
            const item = total[index];
            total[index] = { ...item, count: item.count + 1 };
        } else {
            total.push({ label: article.label, count: 1 });
        }

        return total;
    }, []);
}