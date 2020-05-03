import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import 'react-input-range/lib/css/index.css';
import { Article as IArticle } from '../types';
import config from '../config';
import { useLocation } from "react-router-dom";
import setTitle from '../lib/set-title';

// redux
import SearchBar from '../modules/search-bar/container';
import Configuration from '../modules/configuration/container';
import Articles from '../modules/articles/container';
import DateRangeComponent from '../modules/date-configuration/container';
import { setLabels } from '../modules/configuration/actions';
import { setText } from '../modules/search-bar/actions';
import { setArticles } from '../modules/articles/actions';
import { setDateRange, setDateRangeInterval } from '../modules/date-configuration/actions';
import { IRange } from '../modules/date-configuration/types';

// end of redux
const Loader = require('react-loader');
const useQuery = () => new URLSearchParams(useLocation().search);
const isNumber = (item: any) => new RegExp(/^\d+$/).test(item);

function App(props: any) {
  const query = useQuery();
  const searchWord = query.get('search');
  const [isError, setError] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const getQueryInterval = () => {
    const fromQuery = query.get('from') || '';
    const toQuery = query.get('to') || '';
    return {
      from: isNumber(fromQuery) ? Number.parseInt(fromQuery) : null,
      to: isNumber(fromQuery) ? Number.parseInt(toQuery) : null,
    }
  }

  useEffect(() => {
    const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/sources`;
    axios.get(url)
      .then(response => {
        props.setLabelsHandler(response.data);
        if (searchWord) {
          setTitle(searchWord);
          props.setTextHandler(searchWord);
          const { from, to } = getQueryInterval();
          fetchData(searchWord, from, to);
        }
      })
      .catch(_error => setError(true));
  }, [searchWord]);

  // this will be saga
  const fetchData = (topic: string, from: number | null = null, to: number | null = null) => {
    setLoaded(false);
    props.setArticlesHandler([]);
    const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/filter`;
    axios.post(url, {
      topic: topic
    }).then(response => {
      props.setArticlesHandler(response.data);
      setLoaded(true);

      // date range
      const sortedArticles: IArticle[] = response.data
        .filter((article: IArticle) => !props.skippedLabels.some((label: any) => label === article.label))
        .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts);
      const dateRangeInterval = { max: sortedArticles[0].date.ts, min: sortedArticles[sortedArticles.length - 1].date.ts };
      const dateInterval = {
        max: to || sortedArticles[0].date.ts,
        min: from || sortedArticles[sortedArticles.length - 1].date.ts
      };
      props.setRange(dateInterval);
      props.setInterval(dateRangeInterval);
    }).catch(_error => {
      console.log('gogo', _error)
      setError(true)
    });
  }

  if (isError) return <div className="container text-center mt-5">
    <h2>Chyba v načítání dat</h2>
    <p>Omlouváme se, ale stránka je dočastně nedostupná</p>
  </div>

  return (
    <div>
      <SearchBar />

      <Configuration />

      <Loader loaded={loaded}>
        <DateRangeComponent />
        <Articles />
      </Loader>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => ({
  skippedLabels: state.configuration.skiped,
  ...ownProps
})

const mapDispatchToProps = (dispatch: any) => ({
  setLabelsHandler: (labels: string) => dispatch(setLabels(labels)),
  setTextHandler: (text: string) => dispatch(setText(text)),
  setArticlesHandler: (articles: any[]) => dispatch(setArticles(articles)),
  setRange: (range: IRange) => dispatch(setDateRange(range)),
  setInterval: (interval: IRange) => dispatch(setDateRangeInterval(interval)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
