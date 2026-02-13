import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import AIContentPage from './features/AIContentPage';
import AICaptionPage from './features/AICaptionPage';
import SmartHashtagPage from './features/SmartHashtagPage';
import ContentIdeasPage from './features/ContentIdeasPage';
import AnalyticsPage from './features/AnalyticsPage';
import RealTimeAnalyticsPage from './features/RealTimeAnalyticsPage';
import AudienceInsightsPage from './features/AudienceInsightsPage';
import PerformanceReportsPage from './features/PerformanceReportsPage';
import SchedulingPage from './features/SchedulingPage';
import OptimalTimingPage from './features/OptimalTimingPage';
import WorkflowPage from './features/WorkflowPage';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <Routes>
          <Route path="ai-content" element={<AIContentPage />} />
          <Route path="ai-caption" element={<AICaptionPage />} />
          <Route path="smart-hashtag" element={<SmartHashtagPage />} />
          <Route path="content-ideas" element={<ContentIdeasPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="real-time-analytics" element={<RealTimeAnalyticsPage />} />
          <Route path="audience-insights" element={<AudienceInsightsPage />} />
          <Route path="performance-reports" element={<PerformanceReportsPage />} />
          <Route path="scheduling" element={<SchedulingPage />} />
          <Route path="optimal-timing" element={<OptimalTimingPage />} />
          <Route path="workflow" element={<WorkflowPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Features;