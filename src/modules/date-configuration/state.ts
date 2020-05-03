import { IDateRangeFilter } from './types';

export const defaultRangeFilterState: IDateRangeFilter = {
    actual: 3,
    defaultClass: 'btn btn-primary active',
    secondaryClass: 'btn btn-outline-primary',
    filters: [
        {
            id: 1,
            name: 'Celé období',
            tsFrom: () => 0
        },
        {
            id: 2,
            name: 'Rok',
            tsFrom: () => {
                const date2 = new Date();
                return date2.setFullYear(date2.getFullYear()-1)
            }
        },
        {
            id: 3,
            name: '3 měsíce',
            tsFrom: () => {
                const date3 = new Date();
                return date3.setMonth(date3.getMonth()-3)
            }
        },
        {
            id: 4,
            name: 'Měsíc',
            tsFrom: () => {
                const date4 = new Date();
                return date4.setMonth(date4.getMonth()-1)
            }
        },
    ]
}