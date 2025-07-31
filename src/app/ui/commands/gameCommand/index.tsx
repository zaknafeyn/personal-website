import { FC, useCallback, useEffect, useState } from "react";
import { CommandProps } from "../types";

import { Button } from "app/ui/components/button";
import classNames from "classnames/bind";

import styles from "./gameCommand.module.css";


const cx = classNames.bind(styles);

const X = "X";
const O = "O";
const SIZE = 3;

const initialState = Array.from({ length: 9 }, () => "");

interface FieldProps {
  value: string;
  onClick: () => void;
  disabled?: boolean
}
export const Field: FC<FieldProps> = ({
  value = "",
  onClick,
  disabled = false
}) => {
  const onClickField = useCallback(() => {
    if (disabled) return;

    if (value !== "") return;

    onClick()

  }, [disabled, onClick, value])

  const style = cx({
    field: true,
    disabled,
    occupied: value !== "",
    [value]: value !== "",
  })

  return (
    <div className={style} onClick={onClickField}>
      {value}
    </div>
  );
};

const checkWinner = (board: string[][], col: number, row: number) => {
  const target = board[row][col];
  if (target === "") return false;

  const directions = [
    [0, 1], // horizontal
    [1, 0], // vertical
    [1, 1], // diagonal
    [1, -1], // anti-diagonal
  ];

  const size = SIZE;

  for (const [dx, dy] of directions) {
    let count = 1;

    // Check in the negative direction
    let x = row - dx;
    let y = col - dy;

    while (x >= 0 && y >= 0 && y < size && board[x][y] === target) {
      count++;
      x -= dx;
      y -= dy;
    }

    // Check in the positive direction
    x = row + dx;
    y = col + dy;
    while (x < size && y >= 0 && y < size && board[x][y] === target) {
      count++;
      x += dx;
      y += dy;
    }

    if (count >= SIZE) {
      return true; // Win found
    }
  }

  return false;
};


export const GameCommand: FC<CommandProps> = ({
  setCommandFinished,
}) => {
  const [playField, setPlayField] = useState(initialState);
  const [step, setStep] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const [prevPosition, setPrevPosition] = useState(-1);
  const [message, setMessage] = useState<string>();
  const [winner, setWinner] = useState<string>();
  const [nextPlayer, setNextPlayer] = useState<string>();

  useEffect(() => {
    if (prevPosition === -1) return;
    // detect winner
    const matrix = Array.from({ length: 3 }, () => Array(3).fill(""));
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      matrix[row][col] = playField[i];
    }

    const row = Math.floor(prevPosition / 3);
    const col = prevPosition % 3;
    const value = matrix[row][col];

    const result = checkWinner(matrix, col, row);

    if (result) {
      setWinner(value);
    }
  }, [playField, prevPosition]);

  useEffect(() => {
    if (winner) {
      setMessage(`Player ${winner} wins!`);
      return;
    }

    const nextValue = step % 2 === 0 ? X : O;
    setNextPlayer(nextValue);
    setMessage(`${nextValue} player's turn ...`)
  }, [step, winner]);
  

  const onClick = (idx: number) => () => {
    const value = step % 2 === 0 ? X : O;
    const newPlayField = playField.map((item, i) => (idx === i ? value : item));
    setPlayField(newPlayField);
    setStep((prev) => prev + 1);
    setPrevPosition(idx);
  };

  const onReset = () => {
    setPlayField(initialState);
    setWinner(undefined);
    setStep(0);
    setPrevPosition(-1);
  };

  const onExit = () => {
    setReadOnly(true);
    setCommandFinished();
    setMessage('Game is over');
  };

  const headerStyle = cx({
    message: true,
    ...(!readOnly && nextPlayer && {[nextPlayer]: !winner}),
    ...(!readOnly && winner && { [winner]: !!winner })

  })

  return (
    <div className={ styles.gameCommand }>
      {message && <h2 className={ headerStyle }>{message}</h2>}
      <div className={styles.playArea}>
        {playField.map((item, idx) => {
          return <Field disabled={ readOnly } key={idx} onClick={onClick(idx)} value={item} />;
        })}
      </div>
      <div className={ styles.buttonGroup }>
        <Button disabled={readOnly} onClick={onReset}>Reset</Button>
        <Button disabled={readOnly} onClick={onExit}>Exit</Button>
      </div>
    </div>
  );
};
