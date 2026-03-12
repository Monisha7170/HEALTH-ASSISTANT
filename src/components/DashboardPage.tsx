import React from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  History, 
  User, 
  LogOut, 
  Heart, 
  ChevronRight,
  Activity,
  ShieldCheck,
  Stethoscope as DoctorIcon
} from 'lucide-react';
import { Page, User as UserType } from '../types';

interface DashboardProps {
  user: UserType;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ user, onNavigate, onLogout }) => {
  const stats = [
    { label: 'Check Symptoms', icon: Stethoscope, color: 'bg-blue-500', page: 'checker' as Page },
    { label: 'Previous Reports', icon: History, color: 'bg-emerald-500', page: 'history' as Page },
    { label: 'My Profile', icon: User, color: 'bg-indigo-500', page: 'profile' as Page },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar/Nav */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-slate-900">AI Health</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600 hidden sm:block">Welcome, {user.fullName}</span>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">Hello, {user.fullName}! 👋</h1>
            <p className="mt-2 text-slate-500">How are you feeling today? Let's check your health status.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <button
                key={stat.label}
                onClick={() => onNavigate(stat.page)}
                className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div className={`${stat.color} h-12 w-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-100`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{stat.label}</h3>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Health Tips */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <Activity className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Daily Health Tips</h2>
              </div>
              <div className="space-y-4">
                {[
                  'Drink at least 8 glasses of water daily.',
                  'Maintain a consistent sleep schedule of 7-8 hours.',
                  'Include more leafy greens in your diet.',
                  'Take a 10-minute walk after every meal.'
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                    <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 shrink-0" />
                    <p className="text-sm text-slate-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialists */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <DoctorIcon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Recommended Specialists</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'General Physician', desc: 'Common illnesses' },
                  { name: 'Cardiologist', desc: 'Heart health' },
                  { name: 'Dermatologist', desc: 'Skin care' },
                  { name: 'Neurologist', desc: 'Brain & Nerves' }
                ].map((spec) => (
                  <div key={spec.name} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                    <h4 className="font-bold text-slate-900 text-sm">{spec.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{spec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
