import React from 'react';

interface IProps {
    text: string;
    onChangeHandler: (event: any) => void;
    loadData: (event: any) => void;
}
function SearchBar(props: IProps) {
    return (
        <form className="form-group has-search container mt-4">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Vyhledat" value={props.text} onChange={props.onChangeHandler} />
            <button onClick={props.loadData} className="btn btn-primary btn-rounded btn-sm d-none">Hledat</button>
        </form>
    );
}

export default SearchBar;