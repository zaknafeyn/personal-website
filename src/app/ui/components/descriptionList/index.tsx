import React, { ReactNode } from 'react';
import styles from './descriptionList.module.css';

export type DescriptionItem = {
  label: ReactNode;
  values: ReactNode[];
  isDisabled?: boolean;
};

type DescriptionListProps = {
  items: DescriptionItem[];
  className?: string;
};

export const DescriptionList: React.FC<DescriptionListProps> = ({
  items,
  className = '',
}) => {
  return (
    <dl className={`${styles.descriptionList} ${className}`}>
      {items.filter(item => !item.isDisabled ).map((item, index) => (
        <React.Fragment key={index}>
          <dt className={styles.dt}>{item.label}</dt>
          {item.values.map((value, index) => (<dd key={index} className={styles.dd}>{value}</dd>))}
        </React.Fragment>
      ))}
    </dl>
  );
};
