import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  const role = "admin";

  return (
    <BrowserRouter>
      <Navbar role={role} />

      <Routes>
        <Route path="/events" element={<Events role={role} />} />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/create-event"
          element={<CreateEvent />}
        />

        <Route
          path="/edit-event/:id"
          element={<EditEvent />}
        />

        <Route
          path="/my-registrations"
          element={<MyRegistrations />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;