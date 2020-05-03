import React from 'react';
import InputRange from 'react-input-range';
import { IDateRangeFilter } from './types';
import DateRangeFilter from './component-filter';

type Interval = {
    min: number;
    max: number;
}
interface IProps {
    dateRangeInterval: Interval;
    dateRange: Interval;
    setDateRange: (value: any, redirect: boolean) => void;
    filter: IDateRangeFilter;
    setDateRangeFilter: (filterItemId: number) => void;
}
function dateRangeComponent(props: IProps) {
    const { dateRangeInterval, dateRange, setDateRange, filter, setDateRangeFilter } = props;
    const choosenFilter = filter.filters.find(filterItem => filterItem.id == filter.actual);
    const tsFrom: number = choosenFilter ? choosenFilter.tsFrom(dateRangeInterval.max) : 0;

    const filteredDateRange = {
        min: getMinInterval(dateRange.min, tsFrom),
        max: dateRange.max,
    }

    return (
        <React.Fragment>
            <div className="container p-5 p-md-4">
                {filteredDateRange.min === filteredDateRange.max && <div className="text-center"><strong>Nelze filtrovat</strong></div>}
                {filteredDateRange.min !== filteredDateRange.max && <InputRange
                    step={86400}
                    maxValue={dateRangeInterval.max}
                    minValue={getMinInterval(dateRangeInterval.min, tsFrom)}
                    value={filteredDateRange}
                    onChange={(value: any) => setDateRange(value, false)}
                    onChangeComplete={(value: any) => setDateRange(value, true)}
                    formatLabel={value => formatDate(value)}
                />}
            </div>
            <DateRangeFilter filter={filter} setDateRangeFilter={setDateRangeFilter} />
        </React.Fragment>
    );
}

const formatDate = (dateNumber: number) => {
    const date = new Date(dateNumber);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const getMinInterval = (from: number, filter: number) => {
    if (from < filter) return filter;
    return from;
}

export default dateRangeComponent;