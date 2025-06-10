import { Card } from "./ui_shdn/basic";

// src/components/ui/HelpSection.tsx
export function HelpSection() {
    return (
      <div className="mt-20">
        <Card className="p-8 max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2 font-serif tracking-tight">
            Potrzebujesz pomocy?
          </h3>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Skontaktuj się z nami, jeśli masz pytania dotyczące kursów
          </p>
          <button className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
            Skontaktuj się
          </button>
        </Card>
      </div>
    );
  }