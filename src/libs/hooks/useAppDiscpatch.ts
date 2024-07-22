"use client";

import { AppDispatch } from "@stores/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
