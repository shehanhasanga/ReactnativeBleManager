

import React from 'react';
import {Subtract} from 'utility-types';
import {Theme} from './defaults';
import useTheme from './useTheme';

const withTheme = <T extends WithTheme = WithTheme>(_options = {}) => {
  return (
    WrappedComponent: React.ComponentType<T>,
  ): React.FC<PropsWithoutTheme<T>> => {
    return (props: PropsWithoutTheme<T>) => {
      const theme = useTheme();
      return <WrappedComponent {...(props as T)} theme={theme} />;
    };
  };
};

export interface WithTheme {
  theme: Theme;
}

type PropsWithoutTheme<T extends WithTheme> = React.PropsWithChildren<
  Subtract<T, WithTheme>
>;

export default withTheme;
