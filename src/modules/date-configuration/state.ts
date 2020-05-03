import { IDateRangeFilter } from './types';

export const defaultRangeFilterState: IDateRangeFilter = {
    actual: 3,
    defaultClass: 'btn btn-primary active',
    secondaryClass: 'btn btn-outline-primary',
    filters: [
        {
            id: 1,
            name: 'Celé období',
            tsFrom: (_tsTo: number) => 0
        },
        {
            id: 2,
            name: 'Rok',
            tsFrom: (tsTo: number) => {
                const date2 = new Date(tsTo);
                return date2.setFullYear(date2.getFullYear()-1)
            }
        },
        {
            id: 3,
            name: '3 měsíce',
            tsFrom: (tsTo: number) => {
                const date3 = new Date(tsTo);
                return date3.setMonth(date3.getMonth()-3)
            }
        },
        {
            id: 4,
            name: 'Měsíc',
            tsFrom: (tsTo: number) => {
                const date4 = new Date(tsTo);
                return date4.setMonth(date4.getMonth()-1)
            }
        },
    ]
}