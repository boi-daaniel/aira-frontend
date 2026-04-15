import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { SiteLayout } from "./components/layout/SiteLayout";
import { RequireAdminSession } from "./features/auth/RequireAdminSession";
import { ApplyPage } from "./pages/ApplyPage";
import { HomePage } from "./pages/HomePage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { JobsPage } from "./pages/JobsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminApplicantDetailPage } from "./pages/admin/AdminApplicantDetailPage";
import { AdminApplicantsPage } from "./pages/admin/AdminApplicantsPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminJobDetailPage } from "./pages/admin/AdminJobDetailPage";
import { AdminJobsPage } from "./pages/admin/AdminJobsPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
        <Route path="/careers" element={<Navigate to="/jobs" replace />} />
      </Route>
      <Route element={<RequireAdminSession />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="applicants" element={<AdminApplicantsPage />} />
          <Route path="applicants/:applicantId" element={<AdminApplicantDetailPage />} />
          <Route path="jobs" element={<AdminJobsPage />} />
          <Route path="jobs/:jobId" element={<AdminJobDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
