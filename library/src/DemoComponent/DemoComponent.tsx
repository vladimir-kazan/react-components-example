import React from 'react';
import styles from './DemoComponent.scss';

interface Props {
  title?: string;
}

export const DemoComponent: React.FC<Props> = ({ title = 'Hello world!' }) => {
  return (
    <h1 data-testid="demo-component" className={styles.myClass}>
      {title}
    </h1>
  );
};
