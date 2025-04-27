import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import LandingPage from "../pages/LandingPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="app" element={<MainPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;