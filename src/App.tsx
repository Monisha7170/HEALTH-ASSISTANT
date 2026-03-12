import React, { useState, useEffect } from 'react';
import { Page, User, HealthRecord, AnalysisParams } from './types';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './components/AuthPages';
import { DashboardPage } from './components/DashboardPage';
import { SymptomCheckerPage } from './components/SymptomCheckerPage';
import { ResultPage } from './components/ResultPage';
import { HistoryPage } from './components/HistoryPage';
import { ProfilePage } from './components/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<HealthRecord[]>([]);
  const [currentResult, setCurrentResult] = useState<string | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('health_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
    setCurrentPage('login');
  };

  const handleAnalysisResult = (result: string, params: AnalysisParams) => {
    setCurrentResult(result);
    
    // Create new history record
    const newRecord: HealthRecord = {
      id: Math.random().toString(),
      userId: user?.id || 'guest',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
      symptoms: params.symptoms,
      result: result,
      summary: result.split('\n').find(line => line.includes('RISK')) || 'Health Analysis'
    };

    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('health_history', JSON.stringify(updatedHistory));
    
    setCurrentPage('result');
  };

  const handleViewHistoryRecord = (record: HealthRecord) => {
    setCurrentResult(record.result);
    setCurrentPage('result');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? (
          <DashboardPage 
            user={user} 
            onNavigate={setCurrentPage} 
            onLogout={handleLogout} 
          />
        ) : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'checker':
        return user ? (
          <SymptomCheckerPage 
            user={user} 
            onNavigate={setCurrentPage} 
            onResult={handleAnalysisResult} 
          />
        ) : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'result':
        return currentResult ? (
          <ResultPage 
            result={currentResult} 
            onNavigate={setCurrentPage} 
          />
        ) : <DashboardPage user={user!} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'history':
        return (
          <HistoryPage 
            records={history} 
            onNavigate={setCurrentPage} 
            onViewRecord={handleViewHistoryRecord} 
          />
        );
      case 'profile':
        return user ? (
          <ProfilePage 
            user={user} 
            onNavigate={setCurrentPage} 
          />
        ) : <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      default:
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100">
      {renderPage()}
    </div>
  );
}
