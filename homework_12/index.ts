import { movieData, categoryData } from './data';

// У вас є дві сутності - список фільмів і список категорій фільмів.
// Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.
// Категорія містить поля: назва і фільми.

// У кожного списку є пошук за ім'ям (це, по суті, фільтрація),
// у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.

// У нас визначено три типи фільтрів:
// - Фільтр відповідності має поле `filter`
// - Фільтр діапазону має поле `filter` і `filterTo`
// - Фільтр пошуку за значеннями має поле `values`

// Кожен список містить стан його фільтрів, який може бути змінений
// тільки методом `applySearchValue` або `applyFiltersValue` (за наявності додаткових фільтрів)
// Вам необхідно подумати про поділ вашого коду на різні сутності,
// інтерфеси і типи, щоб зробити ваше рішення типобезпечним.
// Реалізація всіх методів не є необхідною - це за бажанням.

interface IBaseItem {
    name: string;
}

interface IMovie {
    name: string;
    year: number;
    awards: string;
    rating: number;
}

interface IMovieCategory {
    name: string;
    movies: IMovie[];
}

// Типи фільтрів

interface ISearchFilter<T = string> { // пошук за значенням (user input)
    filter: T;
}

interface IRangeFilter { // використовую як частину ValuesFilter щоб поля year і rating можна було шукати як по значенням так і по діапазону
    filter: number;
    filterTo: number;
}

type ValuesFilter<T extends object> = { // утиліта для отримання фільтрів за значеннями (на основі об'єктного типу)
    values: {
        [K in keyof T]+?: T[K] extends number ? ISearchFilter<T[K]> | IRangeFilter : ISearchFilter<T[K]>;
    };
};

type MovieValuesFilter = ValuesFilter<IMovie>; /** MovieValuesFilter = {
//     values: {
//         name?: ISearchFilter<string>;
//         year?: IRangeFilter | ISearchFilter<number>;
//         awards?: ISearchFilter<string>;
//         rating?: IRangeFilter | ISearchFilter<number>;
//     } 
} */

type FilterValuesTypes = IRangeFilter | ISearchFilter<string> | ISearchFilter<number>;



abstract class List<T extends IBaseItem> {
    _searchFilter!: ISearchFilter;
    _rangeFilter!: IRangeFilter; // діапазон кількості items у списку що виводяться

    constructor(protected _list: T[]) {}

    applySearchValue(filter: ISearchFilter): void {
        this._searchFilter = filter;
    }

    applyRangeFilter(rangeFilter: IRangeFilter): void {
        this._rangeFilter = rangeFilter;
    }

    abstract getFiltredList(): T[];
}

class MovieList extends List<IMovie> {
    constructor() {
        super(movieData);
    }

    _filterValues!: MovieValuesFilter;

    applyFilterValues(filterValues: MovieValuesFilter): void {
        this._filterValues = filterValues;
    }

    getFiltredList() {
        const { filter } = this._searchFilter || {};
        const { filter: from, filterTo: to } = this._rangeFilter || {};
        const { values } = this._filterValues || {};

        const filterValues: MovieValuesFilter = omitUndefinedValues({ values: { ...values, name: { filter } } });
        const filtredList: IMovie[] = getFiltredValues(this._list, filterValues);

        return this._rangeFilter ? getRangedList(filtredList, from, to) : filtredList;
    }
}

class MovieCategoryList extends List<IMovieCategory> {
    constructor() {
        super(categoryData);
    }

    getFiltredList() {
        const { filter } = this._searchFilter || {};
        const { filter: from, filterTo: to } = this._rangeFilter || {};

        const filtredList = this._list.filter(item => item.name === filter);

        return this._rangeFilter ? getRangedList(filtredList, from, to) : filtredList;
    }
}

// Перевірки

// MovieList
const movieList = new MovieList();
const movieSearchFilter: ISearchFilter = {
    filter: 'Modris',
};
const filterValues: MovieValuesFilter = {
    values: {
        year: { filter: 2009, filterTo: 2020 },
        rating: { filter: 4, filterTo: 10 },
    },
};

movieList.applySearchValue(movieSearchFilter);
movieList.applyFilterValues(filterValues);
console.log(movieList.getFiltredList());

// MovieCategoryList
const categoryList = new MovieCategoryList();
const categorySearchFilter: ISearchFilter = {
    filter: 'Comedy',
};

categoryList.applySearchValue(categorySearchFilter);
console.log(categoryList.getFiltredList());


// Utils

function isRangeFilter(filter: IRangeFilter | ISearchFilter<string> | ISearchFilter<number>): filter is IRangeFilter {
    return 'filterTo' in filter;
}

function omitUndefinedValues<T extends object>({ values: filterValues }: ValuesFilter<T>) {
    let values: typeof filterValues = {};

    for (let k in filterValues) {
        const v = filterValues[k as keyof typeof filterValues];
        if (v?.filter) {
            values = { ...values, [k]: v };
        }
    }
    return { values };
}

function getFiltredValues<T extends object>(list: T[], filterValues: ValuesFilter<T>): T[] {
    return list.filter(item =>
        Object.entries(filterValues.values).every(([k, v]) => {
            const listValue = item[k as keyof T];
            const value = v as FilterValuesTypes;
            if (isRangeFilter(value) && typeof listValue === 'number') {
                return listValue >= value.filter && listValue <= value.filterTo;
            } else {
                return listValue === value.filter;
            }
        }),
    );
}

function getRangedList<T>(list: T[], from: number, to: number): T[] {
    return list.slice(from, to);
}
