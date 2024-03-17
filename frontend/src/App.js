import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskManager from "./TaskManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/about" component={AboutPage} />
          <Route path="/tasks" component={TaskManager} /> */}
        <Route path="/" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
