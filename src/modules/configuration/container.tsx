import React from 'react';
import { connect } from 'react-redux';
import Configuration from './component';
import { setSkipedLabels } from './actions';
import { useHistory, useLocation } from "react-router-dom";
import { getLabelsWithCount } from './getters';
import { IArticle } from '../articles/types';
import { IRange } from '../date-configuration/types';
import { setDateRange, setDateRangeInterval } from '../date-configuration/actions';

const Container = (props: any) => {
    const { labels, skiped, setSkipedLabels, searchWord, articles, setDateRangeInterval, setDateRange } = props;
    
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    if (labels.length === 0) return null;

    const setSkipedLabelsHandler = (labelsToSkip: string[]) => {
        setSkipedLabels(labelsToSkip);
        if (query.get('from') || query.get('to')) {
            console.log('hisory push');
            history.push({
                pathname: '/',
                search: `?search=${searchWord}`
            });
        }
        
        const sortedArticlesForInterval: IArticle[] = [...articles]
            .filter((article: IArticle) => !labelsToSkip.some((label: string) => label === article.label))
            .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts);

        if (sortedArticlesForInterval.length > 0) {    
            const interval = { max: sortedArticlesForInterval[0].date.ts, min: sortedArticlesForInterval[sortedArticlesForInterval.length - 1].date.ts };
            console.log('set new interval - ', interval);
            setDateRangeInterval(interval);
            setDateRange(interval);
        }
    }

    return <Configuration labels={labels} skipedLabels={skiped} setSkipedLabels={setSkipedLabelsHandler} />
}

const mapStateToProps = (state: any, ownProps: any) => ({
    // labels: state.configuration.labels,
    labels: getLabelsWithCount(state),
    skiped: state.configuration.skiped,
    searchWord: state.searchBar.text,
    articles: state.articles,
    ownProps,
})
const mapDispatchToProps = (dispatch: any) => ({
    setSkipedLabels: (labelsToSkip: string[]) => dispatch(setSkipedLabels(labelsToSkip)),
    setDateRangeInterval: (range: IRange) => dispatch(setDateRangeInterval(range)),
    setDateRange: (range: IRange) => dispatch(setDateRange(range)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);