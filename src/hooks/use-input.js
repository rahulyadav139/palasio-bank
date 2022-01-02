import { useState } from 'react';

const useInput = validateFun => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateFun(value);
  const isInvalid = !validateFun(value) && isTouched;

  const changeHandler = e => {
    setValue(e.target.value);
  };

  const blurHandler = e => {
    setIsTouched(true);
  };

  return {
    value,
    setIsTouched,
    isValid,
    isInvalid,
    changeHandler,
    blurHandler,
  };
};
export default useInput;
