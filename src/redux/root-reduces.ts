import { combineReducers } from 'redux';
import searchBar from '../modules/search-bar/reducer';
import configuration from '../modules/configuration/reducer';
import articles from '../modules/articles/reducer';
import dateConfiguration from '../modules/date-configuration/reducer';

export default combineReducers({
    searchBar,
    configuration,
    articles,
    dateConfiguration
});



