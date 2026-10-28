// context/students-reducer.ts
import { STUDENTS, Student } from "../data/students";

// ── State shape ─────────────────────────────────────────
export type StudentsState = Student[];

// ── Action union type ────────────────────────────────────
export type StudentsAction =
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "REMOVE_STUDENT"; payload: string } // payload = student id
  | { type: "RESET" };

// ── Reducer function ─────────────────────────────────────
// Never mutates state — always returns a new array.
export function studentsReducer(
  state: StudentsState,
  action: StudentsAction
): StudentsState {
  switch (action.type) {
    case "ADD_STUDENT":
      // Prepend so the new student appears at the top
      return [action.payload, ...state];

    case "REMOVE_STUDENT":
      return state.filter((s) => s.id !== action.payload);

    case "RESET":
      return STUDENTS;

    default:
      return state;
  }
}
