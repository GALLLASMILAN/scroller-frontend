import React from 'react';
import InputRange from 'react-input-range';
import { IDateRangeFilter } from './types';

type Interval = {
    min: number;
    max: number;
}
interface IProps {
    dateRangeInterval: Interval;
    dateRange: Interval;
    setDateRange: (value: any) => void;
    filter: IDateRangeFilter;
    setDateRangeFilter: (filterItemId: number) => void;
}
function dateRangeComponent(props: IProps) {
    const { dateRangeInterval, dateRange, setDateRange, filter, setDateRangeFilter } = props;
    const choosenFilter = filter.filters.find(filterItem => filterItem.id == filter.actual);
    const tsFrom: number = choosenFilter ? choosenFilter.tsFrom() : 0;

    const filteredDateRange = {
        min: getMinInterval(dateRange.min, tsFrom),
        max: dateRange.max,
    }

    return (
        <div className="container p-5 p-md-4">
            <InputRange
                step={86400}
                maxValue={dateRangeInterval.max}
                minValue={getMinInterval(dateRangeInterval.min, tsFrom)}
                value={filteredDateRange}
                onChange={(value: any) => setDateRange(value)}
                formatLabel={value => formatDate(value)}
            />
            <div className="p-3 text-center">
                <h4>
                    Nastavení časové osy
                </h4>
                <div className="btn-group btn-group-sm p-1" role="group" aria-label="date range filter">
                    {filter.filters.map(filterItem => {
                        const className = filterItem.id === filter.actual
                            ? filter.defaultClass
                            : filter.secondaryClass;
                        return (
                            <button 
                                key={`date-range-filter-${filterItem.id}`}
                                type="button" 
                                className={`${className}`}
                                onClick={(_event: any) => setDateRangeFilter(filterItem.id)}
                            >{filterItem.name}</button>
                        );
                    })}
                </div>
            </div>
        </div>
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