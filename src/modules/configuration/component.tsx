import React from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

interface IProps {
    labels: any[];
    skipedLabels: string[];
    setSkipedLabels: (skipedLabels: any) => void;
}
function Configuration(props: IProps) {
    const { labels, skipedLabels, setSkipedLabels } = props;
    return (
        <div className="container mt-4">
            {labels.map((item: any, index: number) => {
                // const label = 
                return (
                    <div className="form-check form-check-inline m-2" key={`group-${index}`}>
                        <BootstrapSwitchButton
                            checked={!skipedLabels.some(label => label === item.label)}
                            size="sm"
                            onChange={(checked: boolean) => {
                                if (!checked) setSkipedLabels([...skipedLabels, item.label]);
                                else setSkipedLabels(skipedLabels.filter(label => label !== item.label));
                            }}
                        />
                        <button className="btn btn-sm">
                            {item.label} <span className="badge badge-light">{item.count}</span>
                        </button>
                    </div>
                )
            })}
        </div>
    );
}

export default Configuration;