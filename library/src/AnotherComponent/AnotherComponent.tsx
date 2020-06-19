import React from 'react';
import styles from './AnotherComponent.scss';

interface Props {
  title?: string;
}

export const AnotherComponent: React.FC<Props> = ({ title = 'Hello world!' }) => {
  return (
    <h1 data-testid="demo-component" className={styles.myClass}>
      You set title to: {title}
    </h1>
  );
};
