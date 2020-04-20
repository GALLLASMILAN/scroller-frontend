import React from 'react';
import { connect } from 'react-redux';
import { setDateRange } from './actions';
import DateRange from './component';
import { IArticle } from '../articles/types';
import { IRange } from './types';
import { useHistory } from "react-router-dom";

interface IProps {
    articles: IArticle[];
    interval: IRange;
    range: IRange;
    setDateRange: (range: IRange) => void;
    searchWord: string;
}
const Container = (props: IProps) => {
    const { articles, interval, range, setDateRange, searchWord } = props;
    const history = useHistory();

    if (!articles || articles.length === 0) return null;
    if (!range || !interval) return null;

    const changeDateInterval = (newDateRange: any) => {
        setDateRange(newDateRange);
        history.push({
          pathname: '/',
          search: `?search=${searchWord}&from=${newDateRange.min}&to=${newDateRange.max}`
        });
      }

    return <DateRange dateRangeInterval={interval}  dateRange={range} setDateRange={changeDateInterval} />
}

const mapStateToProps = (state: any) => ({
    searchWord: state.searchBar.text,
    articles: state.articles,
    range: state.dateConfiguration.range,
    interval: state.dateConfiguration.interval,
})
const mapDispatchToProps = (dispatch: any) => ({
    setDateRange: (range: IRange) => dispatch(setDateRange(range))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);