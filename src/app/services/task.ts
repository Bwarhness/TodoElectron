export interface Task {
    Name: string;
    State: stateEnum;
}
export enum stateEnum {
    Completed = 0,
    Deleted = 1,
    Created = 2
}
