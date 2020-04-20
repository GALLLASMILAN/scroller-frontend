import React from 'react';
import { connect } from 'react-redux';
import { IArticle } from './types';
import { setArticles } from './actions';
import { filteredArticles } from './getters';
import Article from './component';

interface IProps {
    articles: IArticle[];
}
const Container = (props: IProps) => {
    const { articles } = props;

    if (!articles || articles.length === 0) return null;

    // here will be more articles instead of div
    return <ul className="container mt-2 list-group list-group-flush">
        {articles.map(article => (
            <Article article={article} />
        ))}
    </ul>
}

const mapStateToProps = (state: any) => ({
    articles: filteredArticles(state)
})
const mapDispatchToProps = (dispatch: any) => ({
    setSkipedLabels: (articles: IArticle[]) => dispatch(setArticles(articles))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);