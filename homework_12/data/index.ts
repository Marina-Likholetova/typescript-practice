export const movieData = [
    {
        name: 'Modris',
        year: 1978,
        rating: 4.2,
        awards: 'Golden Raspberry Awards',
    },
    {
        name: 'Modris',
        year: 2009,
        rating: 7.8,
        awards: 'IOFCP',
    },
    {
        name: 'Meth',
        year: 1989,
        rating: 3.1,
        awards: 'AFI',
    },
    {
        name: 'Week-End in Havana',
        year: 2004,
        rating: 3.0,
        awards: 'AFI',
    },
    {
        name: 'Cold Fever (Á köldum klaka)',
        year: 2005,
        rating: 3.7,
        awards: 'IOFCP',
    },
    {
        name: 'Where Are My Children?',
        year: 2020,
        rating: 5.8,
        awards: 'Cannes Film Festival',
    },
    {
        name: 'Airheads',
        year: 1991,
        rating: 2.8,
        awards: 'Golden Globe Awards',
    },
    {
        name: 'ChromeSkull: Laid to Rest 2',
        year: 1989,
        rating: 7.6,
        awards: 'Cannes Film Festival',
    },
    {
        name: 'Quadrille',
        year: 2017,
        rating: 6.7,
        awards: 'Golden Raspberry Awards',
    },
    {
        name: '700 Sundays',
        year: 2008,
        rating: 8.2,
        awards: '',
    },
    {
        name: 'Asteroid Chasers',
        year: 2001,
        rating: 8.5,
        awards: 'IOFCP',
    },
];

export const categoryData = [
    {
        name: 'Action',
        movies: [movieData[3], movieData[8]],
    },
    {
        name: 'Drama',
        movies: [movieData[2], movieData[9], movieData[3]],
    },
    {
        name: 'Romance',
        movies: [movieData[0], movieData[4]],
    },
    {
        name: 'Adventure',
        movies: [movieData[8], movieData[4], movieData[3]],
    },
    {
        name: 'Mystery',
        movies: [movieData[3], movieData[5]],
    },
    {
        name: 'Documentary',
        movies: [movieData[10]],
    },
    {
        name: 'Comedy',
        movies: [movieData[6], movieData[7], movieData[8]],
    },
];
