import { create } from "zustand";

export type TTime = "currently" | "today" | "weekly";

type TState = {
  search: string;
  time: TTime;
};

type TActions = {
  setSearch: (search: string) => void;
  setTime: (time: TTime) => void;
};

const defaultState: TState = {
  search: "",
  time: "currently",
};

export const useStore = create<TState & TActions>((set) => ({
  ...defaultState,
  setSearch: (search) => set({ search }),
  setTime: (time) => set({ time }),
}));
