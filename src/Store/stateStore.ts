import { atom } from "recoil";

export const answerState = atom<number[]>({
  key: "answerState",
  default: [],
});

export const questionSetState = atom<string>({
  key: "questionSetState",
  default: "A",
});
