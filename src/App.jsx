import { Routes, Route } from "react-router-dom";
import BusStopScreen from "./pages/BusStopScreen";

function App() {
  return (
    <Routes>
      <Route
        path="/bus/:bus_stop_number"
        element={<BusStopScreen />}
      />
    </Routes>
  );
}

export default App;
