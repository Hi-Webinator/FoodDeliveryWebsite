import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/types";

export const useAppDispatch: () => AppDispatch = () => useDispatch();
export const useAppSelector: <T>(selector: (state: RootState) => T) => T = (selector) => useSelector(selector);