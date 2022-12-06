import React, {createContext} from "react";
import {Task} from "../types";

export const TaskContext = createContext<
  [Task[], React.Dispatch<React.SetStateAction<Task[]>>]>([[], () => {}])