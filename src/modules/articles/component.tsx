import React from 'react';
import { IArticle } from './types';

interface IProps {
    article: IArticle
}
function ArticleComponent(props: IProps) {
    const { article } = props;
    return (
        <li className="list-group-item" key={`${article.title}`}>
            ({article.label} <strong>{article.date.readable}</strong>)&nbsp;<a href={`${article.url}`} target="_blank" rel="noreferrer">{article.title}</a> <small>{article.description}</small>
        </li>
    );
}

export default ArticleComponent;