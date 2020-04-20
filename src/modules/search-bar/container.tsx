import React from 'react';
import SearchBar from './component';
import { connect } from 'react-redux';
import { setText } from './actions';
import { useHistory } from "react-router-dom";

interface IProps {
    text: string;
    setText: (text: string) => void;
}
const Container = (props: IProps) => {
    const { text, setText } = props;
    const history = useHistory();
    const onChangeHandler = (event: any) => setText(event.target.value); 
    
    const loadData = (event: any) => {
        event.preventDefault();
        // redirect = load in main component
        history.push({
          pathname: '/',
          search: `?search=${text}`
        });
        setText('');
    }    

    return <SearchBar text={text} onChangeHandler={onChangeHandler} loadData={loadData}/>
}

const mapStateToProps = (state: any, ownProps: any) => ({
    text: state.searchBar.text,
    ownProps,
})
const mapDispatchToProps = (dispatch: any) => ({
    setText: (text: string) => dispatch(setText(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);