"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center bg-black text-cream">
            <div className="text-center px-6">
              <h2 className="text-xl font-semibold mb-2">
                Sesuatu tidak kena berlaku
              </h2>
              <p className="text-cream/70 mb-4">
                Sila muat semula halaman untuk mencuba lagi.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-2 bg-accent hover:bg-accent-light text-black font-semibold transition-colors"
              >
                Cuba Lagi
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
