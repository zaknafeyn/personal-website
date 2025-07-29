import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import styles from "./text.module.css";

export type TextEffect = 'glow' | 'normal';

interface TextProps { children: ReactNode, textEffect?: TextEffect, className?: string };

interface TerminalTextProps extends TextProps {
  quoted?: boolean;
  ref?: React.RefObject<HTMLSpanElement | null>;
}

const Header: FC<TextProps> = ({ children, className }) => {
  const style = classNames(className, styles.textHeader);

  return (
    <span className={style}>{children}</span>
  )
}

const SubHeader: FC<TextProps> = ({ children, className }) => {
  const style = classNames(className, styles.textSubHeader);

  return (
    <span className={style}>{children}</span>
  )
}

const Terminal: FC<TerminalTextProps> = ({ children, className, ref, textEffect = 'normal', quoted = false }) => {
  const style = classNames(
    styles.textTerminal,
    { [styles.terminalGlow]: textEffect === 'glow' },
    className
  );
  
  return (
    <span ref={ref} className={style}>
      {quoted && "\"" }
      {children}
      {quoted && "\"" }
    </span>
  )
}

const Paragraph: FC<TextProps> = ({ children, className }) => {
  const style = classNames(className);

  return (
    <p className={style}>
      {children}
    </p>
  )
}

export const Text = {
  Paragraph,
  Header,
  SubHeader,
  Terminal
}
