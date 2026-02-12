import { createBrowserRouter } from "react-router";
import { TrainTracker } from "./components/TrainTracker";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TrainTracker,
  },
]);
