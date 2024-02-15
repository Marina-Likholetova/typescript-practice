// Ви маєте JS код, який необхідно розширити анотацією примітивів,
// масивів, об'єктів (за необхідності),
// подумати над використанням перерахувань,
// а також реалізувати описані у вигляді коментарів властивості та методи.
// Крім цього є завдання з *, яке не є обов'язковим, але може вас зацікавити.
import { LecturerType, Lecturers, GradeType, VisitType, LevelNames, AreaNames, Status } from './types/index';


class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  _areas: Area[] = [];
  _lecturers: Lecturers = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturers {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas = [...this._areas, area]
  }

  removeArea(areaName: AreaNames): void {
    this._areas = this._areas.filter(area => area.name !== areaName)
  }

  addLecturer(lecturer: LecturerType): void {
    this._lecturers = [...this._lecturers, lecturer]
  }

  removeLecturer(lecturerId: LecturerType["id"]): void {
    this._lecturers = this.lecturers.filter(lecturer => lecturer.id !== lecturerId)
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods

  _levels: Level[] = [];
  _name: AreaNames; 

  constructor(name: AreaNames) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels
  }

  get name(): AreaNames {
    return this._name
  }

  addLevel(level: Level): void {
    const { _groups } = level;
    const groupsByArea = _groups.filter(group => group._area === this._name); // To ensure that 'area' stores only groups corresponding to that area
    this._levels = [...this._levels, {...level, _groups: groupsByArea } as Level] 
  }

  removeLevel(levelName: LevelNames): void {
    this._levels = this._levels.filter(level => level.name !== levelName)
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  id: string
  _groups: Group[] = []
  _name: LevelNames
  _description: string
  
  constructor(name: LevelNames, description: string) {
    this._name = name;
    this._description = description;
    this.id = generateId();
  }

  get name(): LevelNames {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get groups(): Group[] {
    return this._groups
  }

  addGroup(group: Group): void {
    if (group.levelName !== this._name) {  // To unsure that we add group with the same level to out Level
      throw new Error(`The group with ${group.levelName} level cannot be added to ${this._name} groups`)
    }

    this._groups = [...this._groups, group];
  }

  removeGroup(groupId: string): void {
    this._groups = this._groups.filter(group => group.id !== groupId)
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  _area: AreaNames;
  _status: Status = Status.Upcoming; // defaul value
  _students = new ArrayWithToSorted<Student>(); // Modified array so that it has a valid toSorted method*
  directionName: string;
  levelName: LevelNames;
  id: string

  constructor(directionName: string, levelName: LevelNames, area: AreaNames) {
    this.directionName = directionName;
    this.levelName = levelName;
    this._area = area;
    this.id = generateId()
  }

  get area(): AreaNames {
    return this._area;
  }
  get status(): Status {
    return this._status;
  }

  get students(): ArrayWithToSorted<Student> {
    return this._students;
  }

  set status(status: Status) {  // A 'set' accessor cannot have a return type annotation.
    this._status = status;
  }

  addStudent(student: Student): void {
    this._students = new ArrayWithToSorted(...this._students, student)
  }

  removeStudent(id: Student["id"]): void {
    this._students = new ArrayWithToSorted(...this._students.filter(student => student.id !== id))
  }

  showPerformance() {
    const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

class ArrayWithToSorted<T> extends Array<T> { // Class for modifing array so that it has a valid toSorted method
  constructor(...items: T[]) {
    super(...items)
  }

  toSorted(compareFunction: (a: T, b: T) => number): T[] {
    return [...this].sort(compareFunction);
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  id: string
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: GradeType; // workName: mark
  _visits: VisitType[]; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
    this.getPerformanceRating = this.getPerformanceRating
    this.id = generateId()
    this._grades = {}
    this._visits = []
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  set grate(grate: GradeType) {
    this._grades = { ...this._grades, ...grate }
  }

  set visit(visit: VisitType) {
    this._visits = [...this._visits, visit]
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length | 0) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}


// Checking block
{
  const areaProgaming = new Area(AreaNames.Programming);
  const areaTesting = new Area(AreaNames.Testing);
  const levelBacis = new Level(LevelNames.Bacis, "Level discription");
  const levelAdvanced = new Level(LevelNames.Advanced, "Level discription");
  const advencedProg = new Group("DicriptionNameGroup", LevelNames.Advanced, AreaNames.Programming);
  const advencedTest = new Group("DicriptionNameGroup2", LevelNames.Advanced, AreaNames.Testing);
  const bacisTest = new Group("DicriptionNameGroup3", LevelNames.Bacis, AreaNames.Testing);

  // levelAdvanced.addGroup(bacisTest); // Error: The group with Bacis level cannot be added to Advanced groups
  levelBacis.addGroup(bacisTest);
  levelAdvanced.addGroup(advencedProg);
  levelAdvanced.addGroup(advencedTest);
  areaProgaming.addLevel(levelBacis);
  areaProgaming.addLevel(levelAdvanced);

  const student1 = new Student("Anna", "Joy", 2009);
  const student2 = new Student("Nina", "Li", 2008);

  student1.grate = {
    "WorkName3": 3,
  }

  student2.grate = {
    "wokkName1": 7
  }

  advencedProg.addStudent(student1)
  advencedProg.addStudent(student2)
  console.log(advencedProg.showPerformance())
}


// utility function
function generateId(): string {
  return Math.random().toString(36).substring(2, 5);
}



