import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-input-range/lib/css/index.css';
import { Article as IArticle } from './types';
import SearchBar from './components/search-bar';
import Configuration from './components/configuration';
import Article from './components/article';
import DateRangeComponent from './components/date-range';
import config from './config';
import groupBy from './libs/group-by';
const Loader = require('react-loader');

function App() {
  const [isError, setError] = useState(false);
  const [text, setText] = useState('');
  const [articles, setArticles] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [skipedLabels, setSkipedLabels] = useState([]);
  const [dateRange, setDateRange] = useState({ min: 0, max: 0 });
  const [dateRangeInterval, setDateRangeInterval] = useState({ min: 0, max: 0 });

  //labels = to default render
  const [labels, setLabels] = useState([]);

  const onChangeHandler = (event: any) => setText(event.target.value);

  useEffect(() => {
    const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/sources`;
    axios.get(url)
      .then(response => setLabels(response.data))
      .catch(_error => setError(true));
  }, []);

  const filteredArticle = () => {
    return articles
      .filter((article: IArticle) => !skipedLabels.some(label => label === article.label))
      .filter((article: IArticle) => article.date.ts >= dateRange.min && article.date.ts <= dateRange.max)
      .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts);
  }

  let loadData = (event: any) => {
    setLoaded(false);
    setText('');
    setArticles([]);
    event.preventDefault();
    const url = `${config.BACKEND_URL}:${config.BACKEND_PORT}/filter`;
    axios.post(url, {
      topic: text
    }).then(response => {
      setArticles(response.data);
      setLoaded(true);

      // date range
      const sortedArticles: IArticle[] = response.data
        .filter((article: IArticle) => !skipedLabels.some(label => label === article.label))
        .sort((articleA: IArticle, articleB: IArticle) => articleB.date.ts - articleA.date.ts);
      const interval = { max: sortedArticles[0].date.ts, min: sortedArticles[sortedArticles.length - 1].date.ts };
      //console.log('interval', interval)
      setDateRangeInterval(interval);
      setDateRange(interval);
    }).catch(_error => setError(true));
  }

  const getLabels = () => {
    if (articles.length === 0) return labels.map(item => ({ label: item, count: null }))

    const parsedLabels = groupBy(articles);
    const missingLabels = labels.filter(label => !parsedLabels.some(parsedLabel => parsedLabel.label === label));

    if (missingLabels.length === 0) return parsedLabels;
    return [
      ...parsedLabels,
      ...missingLabels.map(item => ({ label: item, count: 0 }))
    ];
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
        labels={getLabels()}
        skipedLabels={skipedLabels}
        setSkipedLabels={(labelsToSkip) => {
          setSkipedLabels(labelsToSkip);
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
        {articles.length > 0 && filteredArticle().length > 0 && <DateRangeComponent
          dateRangeInterval={dateRangeInterval}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />}
       
        {articles.length > 0 && <ul className="container list-group list-group-flush mt-2">
          {filteredArticle().map((article: IArticle) => <Article article={article} />)}
        </ul>}
      </Loader>
    </div>
  );
};

export default App;
