import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CaseDetails from './pages/case-details';
import SystemAdministration from './pages/system-administration';
import TimelineReconstruction from './pages/timeline-reconstruction';
import EvidenceAnalysis from './pages/evidence-analysis';
import InvestigationDashboard from './pages/investigation-dashboard';
import ReportGeneration from './pages/report-generation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<InvestigationDashboard />} />
        <Route path="/case-details" element={<CaseDetails />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/timeline-reconstruction" element={<TimelineReconstruction />} />
        <Route path="/evidence-analysis" element={<EvidenceAnalysis />} />
        <Route path="/investigation-dashboard" element={<InvestigationDashboard />} />
        <Route path="/report-generation" element={<ReportGeneration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
