import React from 'react';
import { History, Calendar, ChevronRight, ArrowLeft, FileText, Search } from 'lucide-react';
import { Page, HealthRecord } from '../types';

interface HistoryProps {
  records: HealthRecord[];
  onNavigate: (page: Page) => void;
  onViewRecord: (record: HealthRecord) => void;
}

export const HistoryPage: React.FC<HistoryProps> = ({ records, onNavigate, onViewRecord }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </button>
          <h2 className="text-xl font-bold text-slate-900">Health History</h2>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-slate-900">Previous Reports</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reports..."
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {records.length === 0 ? (
              <div className="p-12 text-center space-y-4">
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-slate-500 text-sm">No health reports found yet.</p>
                <button 
                  onClick={() => onNavigate('checker')}
                  className="text-blue-600 font-bold text-sm hover:underline"
                >
                  Start your first check
                </button>
              </div>
            ) : (
              records.map((record) => (
                <button
                  key={record.id}
                  onClick={() => onViewRecord(record)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{record.date}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {record.symptoms.split(' ')[0]}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">{record.summary}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
