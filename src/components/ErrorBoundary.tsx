import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B090A] text-[#F5EFE6] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#140F12] border border-[#D4AF37]/30 p-8 text-center">
            <h2 className="font-display text-2xl font-semibold text-[#F5D77F] mb-3">
              Service Temporarily Interrupted
            </h2>
            <p className="text-sm text-[#B8A99A] mb-6 leading-relaxed">
              We encountered a technical issue loading this view. Please refresh the page or contact our wholesale desk at +91 6304375143.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#4A0E1C] border border-[#D4AF37]/50 text-[#F5D77F] text-sm font-medium hover:bg-[#661428] transition-colors cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
