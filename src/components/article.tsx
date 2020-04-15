import React from 'react';
import { Article } from '../types';

interface IProps {
    article: Article
}
function ArticleComponent(props: IProps) {
    const { article } = props;
    return (
        <li className="list-group-item" key={`${article.title}`}>
            ({article.label} <strong>{article.date.readable}</strong>) 
            <a href={`${article.url}`} target="_blank" rel="noreferrer">{article.title}</a> <small>{article.description}</small>
        </li>
    );
}

export default ArticleComponent;