import React, { useState } from 'react';
import axios from 'axios';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
const Loader = require('react-loader');

const groupBy = (articles: any[]) => {
  return articles.reduce((total: any, article) => {
    const index = total.findIndex((item: any) => item.label === article.label);
    if (index !== -1) {
      const item = total[index];
      total[index] = { ...item, count: item.count + 1 };
    } else {
      total.push({ label: article.label, count: 1 });
    }

    return total;
  }, []);
}

function App() {

  const [text, setText] = useState('');
  const [articles, setArticles] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [skipedLabels, setSkipedLabels] = useState([]);

  const onChangeHandler = (event: any) => setText(event.target.value);

  const filteredArticle = () => {
    // @ts-ignore
    return articles.filter(article => !skipedLabels.some(label => label === article.label));
  }

  let loadData = async (event: any) => {
    setLoaded(false);
    setText('');
    setArticles([]);
    event.preventDefault();
    const response = await axios.post('http://ec2-18-185-75-63.eu-central-1.compute.amazonaws.com:3000/filter', {
      topic: text
    });
    setArticles(response.data);
    setLoaded(true);
  }

  return (
    <div>
      <form className="form-group has-search container mt-4">
        <span className="fa fa-search form-control-feedback"></span>
        <input type="text" className="form-control" placeholder="Vyhledat" value={text} onChange={onChangeHandler} />
        <button onClick={loadData} className="btn btn-primary btn-rounded btn-sm d-none">Hledat</button>
      </form>
      {/*articles.length > 0 && <div className="container mt-4">
        {articles.map((article: any) => <p key={`${article.title}`}>
          ({article.label}) <a href={`${article.url}`} target="_blank" rel="noreferrer">{article.title}</a> <small>{article.description}</small>
        </p>)}
  </div>*/}

      <Loader loaded={loaded}>
        {articles.length > 0 && <div className="container mt-2">
          {groupBy(articles).map((item: any, index: number) => <div className="form-check form-check-inline m-2">
            <BootstrapSwitchButton 
              checked={!skipedLabels.some(label => label === item.label)} 
              size="sm"
              onChange={(checked: boolean) => {
                // @ts-ignore
                if (!checked) setSkipedLabels([...skipedLabels, item.label]);
                else setSkipedLabels(skipedLabels.filter(label => label !== item.label));
                // this.setState({ isUserAdmin: checked })
              }}
            />
            <button key={`group-${index}`} className="btn btn-sm">
              {item.label} <span className="badge badge-light">{item.count}</span>

            </button>
          </div>)}
        </div>}

        {articles.length > 0 && <ul className="container list-group list-group-flush mt-2">
          {filteredArticle().map((article: any) => <li className="list-group-item" key={`${article.title}`}>
            ({article.label}) <a href={`${article.url}`} target="_blank" rel="noreferrer">{article.title}</a> <small>{article.description}</small>
          </li>)}
        </ul>}
      </Loader>
    </div>
  );
};

export default App;
