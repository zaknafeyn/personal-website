
import React, { useState, useEffect, FC } from 'react';
import classNames from 'classnames/bind';
  
import styles from './loading.module.css';

const cx = classNames.bind(styles);

type TLoadingVariants = "default" | "minimal" | "detailed";

interface LoadingProps {
  command?: string;
  message?: string;
  showSpinner?: boolean;
  showProgress?: boolean;
  estimatedTime?: number;
  variant?: TLoadingVariants
}

export const Loading: FC<LoadingProps> = ({ 
  command = "loading", 
  message = "Executing command...",
  showSpinner = true,
  estimatedTime = 0,
  variant = "default"
}) => {
  
const [dots, setDots] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);


  // Elapsed time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  useEffect(() => {
    if (!showSpinner) return;
    const interval = setInterval(() => {
      setSpinnerIndex(prev => (prev + 1) % spinnerChars.length);
    }, 100);
    return () => clearInterval(interval);
  }, [showSpinner, spinnerChars.length]);

  const renderMinimal = () => (
    <div className={ cx("consoleFallback", "minimal")}>
        <span className={cx("command")}>{command}</span>
        <span className={cx("loadingDots")}>{dots}</span>
    </div>
  );

  const renderDefault = () => (
    <div className={cx("consoleFallback", "default")}>
      {showSpinner && <span className={cx("spinner")}>{spinnerChars[spinnerIndex]}</span>}
      <span className={cx("message")}>{message}{dots}</span>
    </div>
  );

  const renderDetailed = () => (
    <div className={cx("consoleFallback", "detailed")}>
      <div className={cx("consoleLine")}>
        <span className={cx("timestamp")}>[{new Date().toLocaleTimeString()}]</span>
        <span className={cx("command")}>{command}</span>
      </div>
      <div className={cx("consoleLine", "loading")}>
        {showSpinner && <span className={cx("spinner")}>{spinnerChars[spinnerIndex]}</span>}
        <span className={cx("message")}>{message}{dots}</span>
      </div>
      <div className={cx("consoleLine")}>
        <span className={cx("info")}>⏱️  Elapsed: {elapsedTime.toFixed(1)}s</span>
        {estimatedTime && (
          <span className={cx("info")}>📊 ETA: ~{estimatedTime}s</span>
        )}
      </div>
      <div className={cx("consoleLine")}>
        <span className={cx("status")}>🔄 Status: Loading data...</span>
      </div>
      <div className={cx("consoleLine")}>
        <span className={cx("cursorLine")}>
          <span className={cx("cursor")}>█</span>
        </span>
      </div>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'minimal': return renderMinimal();
      case 'detailed': return renderDetailed();
      default: return renderDefault();
    }
  };

  return (
    <div className={cx("loadingWrapper")}>
      {renderVariant()}
    </div>
  );
};
