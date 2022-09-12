

import {useSelector} from 'react-redux';
import {selectTheme} from './selectors';

const useTheme = () => {
  return useSelector(selectTheme);
};

export default useTheme;
