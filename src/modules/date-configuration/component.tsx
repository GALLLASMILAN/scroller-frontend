import React from 'react';
import InputRange from 'react-input-range';

type Interval = {
    min: number;
    max: number;
}
interface IProps {
    dateRangeInterval: Interval;
    dateRange: Interval;
    setDateRange: (value: any) => void;
}
function dateRangeComponent(props: IProps) {
    const { dateRangeInterval, dateRange, setDateRange } = props;
    return (
        <div className="container p-5 p-md-4">
            <InputRange
                step={86400}
                maxValue={dateRangeInterval.max}
                minValue={dateRangeInterval.min}
                value={dateRange}
                onChange={(value: any) => setDateRange(value)}
                formatLabel={value => formatDate(value)}
            />
        </div>
    );
}

const formatDate = (dateNumber: number) => {
    const date = new Date(dateNumber);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

export default dateRangeComponent;