import React, { useState, useRef, useEffect } from 'react';
import { 
  Stethoscope, 
  Mic, 
  MicOff, 
  Clock, 
  Activity, 
  Navigation, 
  Languages, 
  ArrowRight, 
  Loader2,
  ArrowLeft,
  User
} from 'lucide-react';
import { Page, User as UserType, AnalysisParams } from '../types';
import { analyzeSymptoms } from '../services/gemini';

interface CheckerProps {
  user: UserType;
  onNavigate: (page: Page) => void;
  onResult: (result: string, params: AnalysisParams) => void;
}

const LANGUAGES = [
  { label: 'English', value: 'English' },
  { label: 'ಕನ್ನಡ (Kannada)', value: 'Kannada' },
  { label: 'हिंदी (Hindi)', value: 'Hindi' },
  { label: 'తెలుగు (Telugu)', value: 'Telugu' },
];

const DURATIONS = [
  { label: '1 Day', value: '1 day' },
  { label: '3 Days', value: '3 days' },
  { label: '1 Week', value: '1 week' },
  { label: 'More than 1 week', value: 'more than 1 week' },
];

const SEVERITIES = [
  { label: 'Low', value: 'Low', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { label: 'Medium', value: 'Medium', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  { label: 'High', value: 'High', color: 'text-rose-600 bg-rose-50 border-rose-100' },
];

export const SymptomCheckerPage: React.FC<CheckerProps> = ({ user, onNavigate, onResult }) => {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState(user.age);
  const [duration, setDuration] = useState('1 day');
  const [severity, setSeverity] = useState('Low');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    try {
      const params = { symptoms, age, duration, severity, location, language };
      const analysis = await analyzeSymptoms(params);
      onResult(analysis, params);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Symptom Checker</h2>
              <p className="text-slate-500 text-sm">Describe how you're feeling for an AI analysis.</p>
            </div>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-6">
            {/* Symptoms */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex justify-between">
                Describe your symptoms
                <span className="text-slate-400 font-normal">Required</span>
              </label>
              <div className="relative">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g., I have a mild headache and a sore throat for the last two days..."
                  className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`absolute bottom-4 right-4 p-3 rounded-xl transition-all shadow-sm ${
                    isListening 
                      ? "bg-rose-500 text-white animate-pulse" 
                      : "bg-white text-slate-500 hover:text-blue-600 border border-slate-200"
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4" /> Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>

              {/* Language */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Languages className="w-4 h-4" /> Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none bg-white"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DURATIONS.map(d => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => setDuration(d.value)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      duration === d.value 
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100" 
                        : "bg-white border-slate-200 text-slate-600 hover:border-blue-200"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Severity
              </label>
              <div className="flex gap-3">
                {SEVERITIES.map(s => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSeverity(s.value)}
                    className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      severity === s.value 
                        ? s.color + " ring-1 ring-inset ring-current/20 shadow-sm" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Navigation className="w-4 h-4" /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Area"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || !symptoms.trim()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 group text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Symptoms
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
