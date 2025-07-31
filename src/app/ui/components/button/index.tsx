import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

import styles from './button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, className, ...other }) => {

  return (
    <button className={classNames(styles.button, className)} {...other}>
      {children}
    </button>
  )
}
