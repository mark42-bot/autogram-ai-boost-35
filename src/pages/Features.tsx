import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';
import AIContentPage from './features/AIContentPage';
import AnalyticsPage from './features/AnalyticsPage';
import SchedulingPage from './features/SchedulingPage';
import WorkflowPage from './features/WorkflowPage';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <Routes>
          <Route path="ai-content" element={<AIContentPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="scheduling" element={<SchedulingPage />} />
          <Route path="workflow" element={<WorkflowPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Features;