import { create } from "zustand";

type TState = {
  search: string;
  isSearching: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  globalError: string;
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
  globalError: "",
  location: null,
};

type TActions = {
  setSearch: (search: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setCoordinates: (coordinates: TState["coordinates"]) => void;
  setGlobalError: (error: string) => void;
  setLocation: (location: TState["location"]) => void;
};

export const useGlobalStore = create<TState & TActions>((set) => ({
  ...defaultState,
  setSearch: (search) => set({ search }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setCoordinates: (coordinates) => set({ coordinates, location: null }),
  setGlobalError: (globalError) => {
    if (globalError) set({ globalError, coordinates: null });
    else set({ globalError });
  },
  setLocation: (location) => set({ location }),
}));
