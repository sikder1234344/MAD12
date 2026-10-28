# StudentDirectory — Week 5 (Complete)

Mobile App Dev with React Native & Expo · AIUB · Fall 26-27

Includes Week 2 (directory list, search, detail), Week 3 (tabs + Bookmarks),
Week 4 (AddStudent form with live validation and fake async submit), Week 5
(global state with useReducer + useContext) and the Week 5 Lab Task.

## Run it

```bash
npm install
npx expo install --fix     # aligns package versions to your installed SDK
npx expo start --tunnel    # then scan the QR code with Expo Go
```

Press `w` in the terminal to run in a browser instead.

## Lab Task features

1. **Reset with confirmation** — the Reset button in the title bar opens an
   `Alert`. Only the confirm button dispatches `RESET`.
2. **Live count** — the title reads `Student Directory (N)`, computed from
   `students.length` during render (no extra state).
3. **Duplicate ID block** — `validateForm` checks the ID against the global
   list. A duplicate shows "Student ID already exists" and blocks Submit.

## Bug fixes compared with the manual

- **Detail card stayed open after Remove.** The manual stored the selected
  student object, so it kept showing a deleted student. The selection is now
  stored as an ID and the student is looked up from the context. Removing or
  resetting the list closes the card automatically.
- **Broken import path.** The manual's `./studentsreducer` import is corrected
  to `./students-reducer` (the file name it creates).
- **Stale validation.** Validation re-runs when the student list changes too,
  so the duplicate check stays correct after an add or remove.
- **Skills typo.** Rafiq's skill `"C "` is now `"C"`.

## Notes

- `Alert.alert` does not show on the web preview. Test Remove and Reset in
  Expo Go on a device or in an emulator.
- State lives in memory. Closing the app resets the list to the original 10
  students (persistent storage comes in Week 7).
- Week 3's NewsReader `(home)` stack is not included. The Week 4 and 5 manuals
  use `app/(tabs)/index.tsx` as Home, so that layout is used here.
