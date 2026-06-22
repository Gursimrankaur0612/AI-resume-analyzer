import Dashboard from "./components/Dashboard";
import ResumeUpload from "./components/ResumeUpload";
import History from "./components/History";

function App() {

  return (
    <div className="container mt-4">

      <h1 className="text-center mb-4">
        AI Resume Analyzer
      </h1>

      <Dashboard />

      <hr />

      <ResumeUpload />

      <hr />

      <History />

    </div>
  );
}

export default App;