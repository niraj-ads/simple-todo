import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/index";
import Header from "./components/Header";
import EditTaskPage from "./pages/EditTask.tsx";
import {TaskProvider} from "./context/tasks.tsx";

function App() {
    return (
        <Router>
            <div className="flex items-center justify-center w-full bg-slate-200 text-slate-600 text-xs">
                <TaskProvider>
                    <main className="px-3 pt-5 pb-8 min-h-screen  w-full md:w-4/12">
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/edit/:id" element={<EditTaskPage />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                </TaskProvider>
            </div>
        </Router>
    );
}

export default App
