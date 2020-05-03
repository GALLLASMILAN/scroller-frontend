import React from 'react';
import { connect } from 'react-redux';
import { setDateRange, setDateRangeFilter } from './actions';
import DateRange from './component';
import { IArticle } from '../articles/types';
import { IRange, IDateRangeFilter } from './types';
import { useHistory } from "react-router-dom";

interface IProps {
    articles: IArticle[];
    interval: IRange;
    range: IRange;
    setDateRange: (range: IRange) => void;
    searchWord: string;
    filter: IDateRangeFilter;
    setDateRangeFilter: (filterItemId: number) => void;
}
const Container = (props: IProps) => {
    const { articles, interval, range, setDateRange, searchWord, filter, setDateRangeFilter } = props;
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

    return <DateRange 
        dateRangeInterval={interval} 
        dateRange={range} 
        setDateRange={changeDateInterval} 
        filter={filter} 
        setDateRangeFilter={setDateRangeFilter}
    />
}

const mapStateToProps = (state: any) => ({
    searchWord: state.searchBar.text,
    articles: state.articles,
    range: state.dateConfiguration.range,
    interval: state.dateConfiguration.interval,
    filter: state.dateConfiguration.filter,
})
const mapDispatchToProps = (dispatch: any) => ({
    setDateRange: (range: IRange) => dispatch(setDateRange(range)),
    setDateRangeFilter: (filterId: number) => dispatch(setDateRangeFilter(filterId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);