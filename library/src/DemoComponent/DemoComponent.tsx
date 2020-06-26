import React from 'react';
import styles from './DemoComponent.scss';

interface Props {
  title?: string;
}

export const DemoComponent: React.FC<Props> = ({ title = 'Hello world!' }) => {
  // <h1 className={styles.myClass} data-testid="demo-component">
  //   {title}
  // </h1>
  return (
    <h1 className={styles.myClass} data-testid="demo-component">
      {title}
    </h1>
  );
};
