
export enum AreaNames {
    Programming = "Programming",
    Testing = "Testing",
    Managment = "Managment",
    Design = "Design"
}

export enum LevelNames {
    Bacis = "Bacis",
    Elementary = "Elementary",
    Intermediate = "Intermediate",
    Advanced = "Advanced"
}

export enum Status {
    Ongoing = "Ongoing",
    Past = "Past",
    Upcoming = "Upcoming"
}

export type LecturerType = {
    id: string,
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: number,
    courses: string,
    contacts: number
}

export type GradeType = {
    [workName: string]: number
}

export type VisitType = {
    [lesson: string]: boolean
}

export type ArrayWithSort<T> = Array<T> & {
    toSort(compareFunction: (a: T, b: T) => number): T[];
};

export type Lecturers = LecturerType[];


