import {useState} from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [inputValidity, setInputValidity] = useState(inputValues);
  const [inputValidationMessage, setInputValidationMessage] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    setInputValidity({...inputValidity, [name]: event.target.validity.valid});
    setInputValidationMessage({...inputValidationMessage, [name]: event.target.validationMessage})
  };

  const resetAllForms = () => {
    setValues({...values, cardDescription: '', linkImg: '', nameUser: '', activity: ''});
    setInputValidity({...values, cardDescription: '', linkImg: '', nameUser: '', activity: ''});
    setInputValidationMessage({...values, cardDescription: '', linkImg: '', nameUser: '', activity: ''});
  }

  return {values, inputValidity, inputValidationMessage, setValues, handleChange, resetAllForms};
}
