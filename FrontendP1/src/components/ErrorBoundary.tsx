import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md space-y-4 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-danger" />
            <h1 className="text-lg font-semibold text-gray-900">Algo salio mal</h1>
            <p className="text-sm text-gray-500">
              Ocurrio un error inesperado. Puedes intentar de nuevo o volver al dashboard.
            </p>
            {this.state.error && (
              <pre className="overflow-auto rounded-lg bg-gray-100 p-3 text-left text-xs text-gray-600">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                Volver al dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
