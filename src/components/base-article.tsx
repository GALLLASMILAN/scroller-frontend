import React from 'react';
import { Article } from '../types';

interface IProps {
    article: Article
}
function BaseArticle(props: IProps) {
    const { article } = props;
    return (
        <p key={`${article.title}`}>
            ({article.label}) <a href={`${article.url}`} target="_blank" rel="noreferrer">{article.title}</a> <small>{article.description}</small>
        </p>
    );
}

export default BaseArticle;