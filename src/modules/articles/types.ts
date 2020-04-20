export interface IArticle {
    url: string;
    title: string;
    description: string;
    main: boolean;
    label: string;
    date: {
        ts: number;
        readable: string;
    }
}