import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-input-range/lib/css/index.css';
import { Article as IArticle } from '../types';
import SearchBar from '../components/search-bar';
import Configuration from '../components/configuration';
import Article from '../components/article';
import DateRangeComponent from '../components/date-range';
import config from '../config';
import getLabels from '../libs/get-labels';
import { useLocation, useHistory } from "react-router-dom";
const Loader = require('react-loader');

const useQuery = () => new URLSearchParams(useLocation().search);
const isNumber = (item: any) => new RegExp(/^\d+$/).test(item);

function App() {
  const query = useQuery();
  const history = useHistory();
  const searchWord = query.get('search');
  const [isError, setError] = useState(false);
  const [text, setText] = useState('');
  const [articles, setArticles] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [skipedLabels, setSkipedLabels] = useState([]);
  const [dateRange, setDateRange] = useState({ min: 0, max: 0 });
  const [dateRangeInterval, setDateRangeInterval] = useState({ min: 0, max: 0 });

  const changeDateInterval = (newDateRange: any) => {
    setDateRange(newDateRange);
    console.log('fdsfljdsafkl: ', text);
    history.push({
      pathname: '/',
      search: `?search=${searchWord}&from=${newDateRange.min}&to=${newDateRange.max}`
    });
  }

  //labels = to default render
  const [labels, setLabels] = useState([]);

  const onChangeHandler = (event: any) => setText(event.target.value);

  useEffect(() => {
    const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/sources`;
    axios.get(url)
      .then(response => {
        setLabels(response.data);
        if (searchWord) {
          const fromQuery = query.get('from') || '';
          const toQuery = query.get('to') || '';
          const from = isNumber(fromQuery) ? Number.parseInt(fromQuery) : null;
          const to = isNumber(fromQuery) ? Number.parseInt(toQuery) : null;
          fetchData(searchWord, from, to);
        }
      })
      .catch(_error => setError(true));
  }, [searchWord]);

  const filteredArticle = () => {
    return articles
      .filter((article: IArticle) => !skipedLabels.some(label => label === article.label))
      .filter((article: IArticle) => article.date.ts >= dateRange.min && article.date.ts <= dateRange.max)
      .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts);
  }

  const loadData = (event: any) => {
    event.preventDefault();
    history.push({
      pathname: '/',
      search: `?search=${text}`
    });
    fetchData(text);
  }

  const fetchData = (topic: string, from: number|null = null, to: number|null = null) => {
    setLoaded(false);
    setText('');
    setArticles([]);
    const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/filter`;
    axios.post(url, {
      topic: topic
    }).then(response => {
      setArticles(response.data);
      setLoaded(true);

      // date range
      const sortedArticles: IArticle[] = response.data
        .filter((article: IArticle) => !skipedLabels.some(label => label === article.label))
        .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts);
      const dateRangeInterval = { max: sortedArticles[0].date.ts, min: sortedArticles[sortedArticles.length - 1].date.ts };
      const dateInterval = { 
        max: to || sortedArticles[0].date.ts, 
        min: from || sortedArticles[sortedArticles.length - 1].date.ts 
      };
      //console.log('interval', interval)
      setDateRangeInterval(dateRangeInterval);
      setDateRange(dateInterval);
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
      <SearchBar
        text={text}
        onChangeHandler={onChangeHandler}
        loadData={loadData}
      />

      {labels.length > 0 && <Configuration
        labels={getLabels(articles, labels)}
        skipedLabels={skipedLabels}
        setSkipedLabels={(labelsToSkip) => {
          setSkipedLabels(labelsToSkip);
          history.push({
            pathname: '/',
            search: `?search=${searchWord}`
          });
          // interval
          var sortedArticlesForInterval: IArticle[] = [...articles]
            .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts)
            .filter((article: IArticle) => !labelsToSkip.some((label: string) => label === article.label));

          if (sortedArticlesForInterval.length > 0) {
            // main interval
            const interval = { max: sortedArticlesForInterval[0].date.ts, min: sortedArticlesForInterval[sortedArticlesForInterval.length - 1].date.ts };
            console.log('set new interval - ', interval);
            setDateRangeInterval(interval);
            setDateRange(interval);
          }
        }}
      />}

      <Loader loaded={loaded}>
        {articles.length > 0 && <DateRangeComponent
          dateRangeInterval={dateRangeInterval}
          dateRange={dateRange}
          setDateRange={changeDateInterval}
        />}

        {articles.length > 0 && <ul className="container list-group list-group-flush mt-2">
          {filteredArticle().map((article: IArticle) => <Article article={article} />)}
        </ul>}
      </Loader>
    </div>
  );
};

export default App;
