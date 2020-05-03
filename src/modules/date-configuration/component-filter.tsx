import React from 'react';
import { IDateRangeFilter } from './types';

interface IProps {
    filter: IDateRangeFilter;
    setDateRangeFilter: (filterItemId: number) => void;
}

function DateRangeFilter(props: IProps) {
    const { filter, setDateRangeFilter } = props;
    return (
        <div className="mb-lg-4 mb-md-4 mb-5 text-center">
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
    )
}


export default DateRangeFilter;