import { create } from "zustand";

type TState = {
  search: string;
  isSearching: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  // error: string;
  location: {
    city: string;
    region: string;
    country: string;
  } | null;
};

const defaultState: TState = {
  search: "",
  isSearching: false,
  coordinates: null,
  // error: "",
  location: null,
};

type TActions = {
  setSearch: (search: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setCoordinates: (coordinates: TState["coordinates"]) => void;
  // setError: (error: string) => void;
  setLocation: (location: TState["location"]) => void;
};

export const useGlobalStore = create<TState & TActions>((set) => ({
  ...defaultState,
  setSearch: (search) => set({ search }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setCoordinates: (coordinates) => set({ coordinates, location: null }),
  // setError: (error) => set({ error }),
  setLocation: (location) => set({ location }),
}));
