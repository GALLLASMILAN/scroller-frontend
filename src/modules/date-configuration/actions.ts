import { IRange } from "./types";

export const setDateRange = (range: IRange) => ({
    type: 'SET_DATE_RANGE',
    payload: range
});

export const setDateRangeInterval = (interval: IRange) => ({
    type: 'SET_DATE_RANGE_INTERVAL',
    payload: interval
});