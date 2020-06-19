import React from 'react';
import { render } from '@testing-library/react';

import { DemoComponent } from './DemoComponent';

describe('Test Component', () => {
  let props: any;

  beforeEach(() => {
    props = {
      title: undefined,
    };
  });

  const renderComponent = () => render(<DemoComponent {...props} />);

  it('should render with default title', () => {
    const { getByTestId } = renderComponent();

    const testComponent = getByTestId('demo-component');

    expect(testComponent).toHaveTextContent('Hello world!');
  });

  it('should render title from props', () => {
    props.title = 'Hello Universe!';
    const { getByTestId } = renderComponent();

    const testComponent = getByTestId('demo-component');

    expect(testComponent).toHaveTextContent('Hello Universe!');
  });
});
