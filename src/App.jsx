import { Routes, Route } from "react-router-dom";
import BusStopScreen from "./pages/BusStopScreen";

function App() {
  return (
    <Routes>
      <Route
        path="/bus"
        element={<BusStopScreen />}
      />
    </Routes>
  );
}

export default App;
