import { IRange } from "./types";

export const setDateRange = (range: IRange) => ({
    type: 'SET_DATE_RANGE',
    payload: range
});

export const setDateRangeInterval = (interval: IRange) => ({
    type: 'SET_DATE_RANGE_INTERVAL',
    payload: interval
});

export const setDateRangeDefaultClass = (className: string) => ({
    type: 'SET_DATE_RANGE_DEFAULT_CLASS',
    payload: className
});

export const setDateRangeSecondaryClass = (className: string) => ({
    type: 'SET_DATE_RANGE_SECONDARY_CLASS',
    payload: className
});

export const setDateRangeFilter = (choosenFilter: number) => ({
    type: 'SET_DATE_RANGE_FILTER',
    payload: choosenFilter
});