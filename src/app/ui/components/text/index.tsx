import React, { FC, ReactNode } from 'react';
import styles from "./text.module.css";

export type TextEffect = 'glow' | 'normal';

interface TextProps { children: ReactNode, textEffect?: TextEffect };

interface TerminalTextProps extends TextProps {
  quoted?: boolean;
}

const Header: FC<TextProps> = ({ children }) => (
  <span className={ styles.textHeader}>{ children}</span>
)


const Terminal: FC<TerminalTextProps> = ({ children, textEffect = 'normal', quoted = false }) => {
  const style = [
    styles.textTerminal,
    ...(textEffect === 'glow' ? [styles.terminalGlow] : [])
  ].join(' ');
  return (
    <span className={style}>
      {quoted && "\"" }
      {children}
      {quoted && "\"" }
    </span>
  )
}

const Paragraph: FC<TextProps> = ({ children }) => (
    <p>
      {children}
    </p>
  )

export const Text = {
  Paragraph,
  Header,
  Terminal
}
