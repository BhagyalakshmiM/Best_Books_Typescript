import { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

// using lazy loading to load the component on demand
const Dashboard = lazy(() => import("../Dashboard"));
const Favorites = lazy(() => import('../Favorites'));
const Setting = lazy(() => import("../Setting"))

const AppRouter = () => (
    <div className="container">
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Dashboard pageName="Dashboard" />} />
          <Route path="/favorite" element={<Favorites pageName="Favorites" />} />
          <Route path="/setting" element={<Setting pageName="Account Setting" />} />
        </Routes>
      </Suspense>
    </div>
);

export default AppRouter;