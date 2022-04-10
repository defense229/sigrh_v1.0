import React, { Component, ErrorInfo } from 'react';
import NotFoud from '../../../pages/NotFoud';

export class ErrorBoundary extends Component {
  public state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <NotFoud />
        </div>
      );
    }

    return this.props.children;
  }
}
