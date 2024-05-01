import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Error rendering chart</h2>
          <p>Please choose a different view.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
