
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { SubjectDetail } from './pages/SubjectDetail';
import { TopicView } from './pages/TopicView';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { TeacherProfile } from './pages/TeacherProfile';
import { FlashcardReview } from './pages/FlashcardReview';

// Admin Imports
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminSettings } from './pages/admin/AdminSettings';

// Simple placeholder for Subjects List
const SubjectsList = () => <Navigate to="/dashboard" replace />;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<SubjectsList />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
        <Route path="/topic/:disciplineId/:moduleId/:topicId" element={<TopicView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/review" element={<FlashcardReview />} />
        
        {/* Shared Routes */}
        <Route path="/chat" element={<Chat />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/students" element={<TeacherDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/content" element={<AdminContent />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;