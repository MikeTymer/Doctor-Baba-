import { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-slate-900 border-2 border-amber-600/60 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-200">
                Application Recovered
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                An unexpected interface issue occurred. You can safely reload the page or return to the main temple homepage.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-left">
                <p className="text-[11px] font-mono text-rose-300 break-words">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
                className="flex-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" /> Go to Home
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
