import React, { Component } from 'react';
import CardWrapper from '../functional/CardWrapper';

class AuditLogger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      notification: null,
    };
    this.timer = null;
  }

  componentDidMount() {
    try {
      const savedLogs = localStorage.getItem('audit_logs');
      if (savedLogs) {
        const parsedLogs = JSON.parse(savedLogs);
        if (Array.isArray(parsedLogs)) {
          this.setState({ logs: parsedLogs });
        }
      }
    } catch (error) {
      console.error('Failed to load audit logs from localStorage:', error);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.latestAction &&
      this.props.latestAction !== prevProps.latestAction
    ) {
      const updatedLogs = [this.props.latestAction, ...this.state.logs];

      try {
        localStorage.setItem('audit_logs', JSON.stringify(updatedLogs));
      } catch (error) {
        console.error('Failed to save audit logs to localStorage:', error);
      }

      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.setState({
        logs: updatedLogs,
        notification: 'New log recorded: ' + this.props.latestAction.message,
      });

      this.timer = setTimeout(() => {
        this.setState({ notification: null });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  handleClearLogs = () => {
    try {
      localStorage.removeItem('audit_logs');
    } catch (error) {
      console.error('Failed to clear audit logs from localStorage:', error);
    }
    this.setState({ logs: [], notification: null });
  };

  render() {
    const { logs, notification } = this.state;

    return (
      <CardWrapper title="System Audit Logger (Class Component)">
        <div className="audit-logger-container">
          {notification && (
            <div className="audit-notification">
              🔔 {notification}
            </div>
          )}

          <div className="audit-header-actions">
            <span>Total Recorded Events: {logs.length}</span>
            <button
              type="button"
              className="clear-logs-btn"
              onClick={this.handleClearLogs}
              disabled={logs.length === 0}
            >
              Clear Logs
            </button>
          </div>

          <div className="audit-log-list">
            {logs.length === 0 ? (
              <p className="no-logs-msg">No actions logged yet.</p>
            ) : (
              <ul>
                {logs.map((log) => (
                  <li key={log.id} className="audit-log-item">
                    <span className="log-time">[{log.timestamp}]</span>
                    <span className="log-msg">{log.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardWrapper>
    );
  }
}

export default AuditLogger;
