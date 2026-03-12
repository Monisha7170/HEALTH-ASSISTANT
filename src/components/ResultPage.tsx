import React from 'react';
import { 
  Activity, 
  Info, 
  AlertTriangle, 
  Stethoscope, 
  ShieldAlert, 
  Pill, 
  Hospital, 
  XCircle, 
  CheckCircle2,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Page } from '../types';

interface ResultProps {
  result: string;
  onNavigate: (page: Page) => void;
}

export const ResultPage: React.FC<ResultProps> = ({ result, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('checker')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> New Analysis
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-xl border border-slate-200">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-white rounded-xl border border-slate-200">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Activity className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Health Analysis Result</h2>
          </div>

          <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-headings:mt-8 prose-headings:mb-4 prose-p:text-slate-600 prose-li:text-slate-600">
            <ReactMarkdown
              components={{
                h3: ({ children }) => {
                  const text = children?.toString() || '';
                  let icon = <Info className="w-4 h-4" />;
                  let color = "bg-slate-100 text-slate-700";

                  if (text.includes('RISK')) {
                    icon = <AlertTriangle className="w-4 h-4" />;
                    color = "bg-amber-100 text-amber-700";
                  } else if (text.includes('CONDITION')) {
                    icon = <Activity className="w-4 h-4" />;
                    color = "bg-blue-100 text-blue-700";
                  } else if (text.includes('DOCTOR')) {
                    icon = <Stethoscope className="w-4 h-4" />;
                    color = "bg-indigo-100 text-indigo-700";
                  } else if (text.includes('PRECAUTION')) {
                    icon = <ShieldAlert className="w-4 h-4" />;
                    color = "bg-emerald-100 text-emerald-700";
                  } else if (text.includes('MEDICINE')) {
                    icon = <Pill className="w-4 h-4" />;
                    color = "bg-purple-100 text-purple-700";
                  } else if (text.includes('HOSPITAL')) {
                    icon = <Hospital className="w-4 h-4" />;
                    color = "bg-rose-100 text-rose-700";
                  } else if (text.includes('EMERGENCY')) {
                    icon = <XCircle className="w-4 h-4" />;
                    color = "bg-red-600 text-white";
                  }

                  return (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl w-fit mb-4 mt-8 font-bold text-xs uppercase tracking-widest ${color}`}>
                      {icon}
                      {children}
                    </div>
                  );
                },
                ul: ({ children }) => (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none p-0">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm m-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="font-medium">{children}</span>
                  </li>
                ),
                p: ({ children }) => {
                  const text = children?.toString() || '';
                  if (text.includes('DISCLAIMER')) {
                    return (
                      <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-200 text-[11px] leading-relaxed text-slate-400 italic text-center">
                        {children}
                      </div>
                    );
                  }
                  return <p className="text-slate-600 leading-relaxed mb-4 text-base">{children}</p>;
                }
              }}
            >
              {result}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
