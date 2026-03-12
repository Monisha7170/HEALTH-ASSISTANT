import React from 'react';
import { User, Mail, Phone, Calendar, Users, ArrowLeft, ShieldCheck, Settings, Bell, Shield } from 'lucide-react';
import { Page, User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
  onNavigate: (page: Page) => void;
}

export const ProfilePage: React.FC<ProfileProps> = ({ user, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-[2rem] shadow-lg">
              <div className="h-24 w-24 bg-slate-100 rounded-[1.8rem] flex items-center justify-center text-blue-600">
                <User className="h-12 w-12" />
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.fullName}</h1>
                <p className="text-slate-500 text-sm">{user.email}</p>
              </div>
              <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                <Settings className="h-4 w-4" /> Edit Profile
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-xl text-blue-600 border border-slate-100">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-bold text-slate-700">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-xl text-emerald-600 border border-slate-100">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-sm font-bold text-slate-700">{user.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-xl text-amber-600 border border-slate-100">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Age</p>
                  <p className="text-sm font-bold text-slate-700">{user.age} Years</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-white rounded-xl text-indigo-600 border border-slate-100">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gender</p>
                  <p className="text-sm font-bold text-slate-700">{user.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <button className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Bell className="h-6 w-6" />
            </div>
            <span className="font-bold text-slate-700">Notifications</span>
          </button>
          <button className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="font-bold text-slate-700">Security</span>
          </button>
          <button className="p-6 bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all text-left flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
              <Shield className="h-6 w-6" />
            </div>
            <span className="font-bold text-slate-700">Privacy</span>
          </button>
        </div>
      </div>
    </div>
  );
};
