import { createContext } from "react";
import data5 from "../data.json";

export const DataContext = createContext({ dataI: data5, handleDelete: () => {}, handleUpdate: () => {}, handleAdd: () => {} });
