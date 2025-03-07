import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home.tsx";
import BookLoop from "./pages/bookLoop.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/home" element={<Home />}>
                    <Route index element={<BookLoop />} />
                    <Route path="search" element={<Search />} />
                </Route>

                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
