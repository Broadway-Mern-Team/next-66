import { HTMLInputTypeAttribute, ReactNode } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export type FormLabelProps = Readonly<{
  htmlFor?: string, 
  className?: string, 
  children: ReactNode
}>

export type InputProps<T extends FieldValues> = Readonly<{
  name: Path<T>, 
  type?: HTMLInputTypeAttribute, 
  className?: string, 
  errMsg?: string, 
  control: Control<T>
}>

export type InputComponentProps<T extends FieldValues> = Readonly<{
  htmlFor?: string;
  labelTxt: ReactNode;
  labelClass?: string;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
  inputClass?: string;
  errMsg?: string;
  control: Control<T>;
}>;


export type SingleOptionType = {
  label: string, value: string | number
}

export type SelectOptionProps<T extends FieldValues> = Readonly<{
  name: Path<T>;
  className?: string;
  errMsg?: string;
  control: Control<T>;
  options: Array<SingleOptionType>;
}>;

export type SelectOptionComponentProps<T extends FieldValues> = Readonly<{
  htmlFor?: string;
  labelTxt: ReactNode;
  labelClass?: string;

  name: Path<T>;
  inputClass?: string;
  errMsg?: string;
  control: Control<T>;
  options: Array<SingleOptionType>;
}>;

export type FormSubmitButtonProps = Readonly<{
  cancelShow?: boolean, 
  disabled?: boolean, 
  cancelTxt?: ReactNode, 
  submitTxt?: ReactNode
}>