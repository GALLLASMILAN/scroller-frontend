import React from 'react';

interface IProps {
    text: string;
    onChangeHandler: (event: any) => void;
    loadData: (event: any) => void;
}
export default (props: IProps) => {
    const onSubmitHanlder = (e: any) => {
        // @ts-ignore
        if (document && document.activeElement) document.activeElement.blur();
        props.loadData(e);
    }
    return (
        <form className="form-group has-search container mt-4" onSubmit={onSubmitHanlder}>
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Vyhledat" value={props.text} onChange={props.onChangeHandler} />
            <button className="btn btn-primary btn-rounded btn-sm d-none">Hledat</button>
        </form>
    );
}
