export interface IRange {
    min: number;
    max: number;
}

export interface IDateRangeFilter {
    actual: number;
    defaultClass: string;
    secondaryClass: string;
    filters: IFilterItem[];
}

export interface IFilterItem {
    id: number;
    name: string;
    tsFrom: (tsTo: number) => number;
}