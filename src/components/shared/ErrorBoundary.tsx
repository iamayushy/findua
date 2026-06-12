import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="pdp-error" style={{ textAlign: "center", padding: "40px" }}>
          <h2>Something went wrong</h2>
          <p style={{ margin: "16px 0" }}>Failed to load the product data.</p>
          <Button onClick={this.handleRetry}>Retry</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
