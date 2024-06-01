import { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';

const Dashboard = lazy(() => import("../Dashboard"));
const Favorite = lazy(() => import('../Favorite'));
const Setting = lazy(() => import("../Setting"))

const AppRouter = () => (
    <div className="container">
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Dashboard pageName="Dashboard" />} />
          <Route path="/favorite" element={<Favorite pageName="Favorite" />} />
          <Route path="/setting" element={<Setting pageName="Account Setting" />} />
        </Routes>
      </Suspense>
    </div>
);

export default AppRouter;