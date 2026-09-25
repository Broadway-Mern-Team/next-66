import {FormLabel} from "@/components/ui/form/Label"
import {FileUpload, Input, SelectOption} from "@/components/ui/form/Input"
import { FormSubmitButtonProps, InputComponentProps, SelectOptionComponentProps } from "./form.contract";
import { FieldValues } from "react-hook-form";

export const InputComponent = <T extends FieldValues>({htmlFor='', labelTxt, labelClass='', name, type='text', inputClass='', errMsg='', control}: InputComponentProps<T>) => {
  return (
    <div className="flex items-center">
      <FormLabel htmlFor={htmlFor} className={labelClass}>{labelTxt}</FormLabel>
      <div className="w-full lg:w-2/3">
        <Input name={name} type={type} control={control} className={inputClass} errMsg={errMsg}/>
      </div>
    </div>
  );
}

export const FileUploadComponent = <T extends FieldValues>({htmlFor='', labelTxt, labelClass='', name, type='text', inputClass='', errMsg='', control}: InputComponentProps<T>) => {
  return (
    <div className="flex items-center">
      <FormLabel htmlFor={htmlFor} className={labelClass}>{labelTxt}</FormLabel>
      <div className="w-full lg:w-2/3">
        <FileUpload name={name} control={control} className={inputClass} errMsg={errMsg}/>
      </div>
    </div>
  );
}


export const SelectOptionComponent = <T extends FieldValues>({htmlFor='', labelTxt, labelClass='', name, inputClass='', errMsg='', control, options}: SelectOptionComponentProps<T>) => {
  return (
    <div className="flex items-center">
      <FormLabel htmlFor={htmlFor} className={labelClass}>
        {labelTxt}
      </FormLabel>
      <div className="w-full lg:w-2/3">
        <SelectOption
          name={name}
          control={control}
          className={inputClass}
          errMsg={errMsg}
          options={options}
        />
      </div>
    </div>
  );
}

export const FormSubmitButtonComponent = ({cancelShow=true, disabled=false, cancelTxt="Cancel", submitTxt="Submit"}: FormSubmitButtonProps) => {
  return (
    <div className="flex gap-5 items-center">
      {
        cancelShow ? <button 
          disabled={disabled}
          type="reset"
          className={`
            w-full rounded-md flex p-2 items-center justify-center text-white hover:scale-103 transition duration-300 cursor-pointer text-lg font-semibold
            bg-red-800 hover:bg-red-900 
            disabled:bg-red-950/60 disabled:scale-100 disabled:hover:bg-red-950/60 disabled:cursor-not-allowed`}>
          {cancelTxt}
        </button> : <></>
      }
      <button 
        type="submit"
        disabled={disabled}
        className={`
          w-full rounded-md flex p-2 items-center justify-center text-white hover:scale-103 transition duration-300 cursor-pointer text-lg font-semibold
          bg-teal-800 hover:bg-teal-900 
          disabled:bg-teal-950/60 disabled:scale-100 disabled:hover:bg-teal-950/60 disabled:cursor-not-allowed`}>
          {submitTxt}
        </button>
    </div>
  );
}