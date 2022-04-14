import { atom } from "recoil";

export const answerState = atom<number[]>({
  key: "answerState",
  default: [],
});

export const questionSetState = atom<string>({
  key: "questionSetState",
  default: "A",
});

export const mbtiResultState = atom<any>({
  key: "mbtiResultState",
  default: {},
});

export const musicListState = atom<any>({
  key: "musicListState",
  default: [],
});

export const thumbsUpState = atom<number | null>({
  key: "thumbsUpState",
  default: null,
  // 1이면 추천되었어요, 0이면 이미 추천하셨어요, -1이면 에러가 발생했어요, null이면 초기값
});
