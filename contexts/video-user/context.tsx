import { createContext, ReactNode, ReducerWithoutAction, useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const VideoUserContext = createContext({});

interface Props {
  children: ReactNode;
}

export function VideoUserProvider(props: Props) {
  const [state, dispatch] = useReducer(
    reducer as unknown as ReducerWithoutAction<unknown>,
    initialState,
  );

  return (
    <VideoUserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </VideoUserContext.Provider>
  );
}

export const VideoUserConsumer = VideoUserContext.Consumer;
