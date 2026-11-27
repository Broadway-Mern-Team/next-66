import { Controller, FieldValues } from "react-hook-form";
import {
  InputProps,
  SelectOptionProps,
  SingleOptionType,
} from "./form.contract";

export const Input = <T extends FieldValues>({
  name,
  type = "text",
  className = "",
  errMsg = "",
  control,
}: InputProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <input
                type={type}
                id={name}
                {...field}
                className={`border border-gray-300 shadow py-2 px-5 w-full rounded-md focus:ring-0 bg-white placeholder:italic placeholder:text-gray-400 ${className}`}
                placeholder={`Enter your ${name}...`}
              />
              <span className="text-red-700 text-sm italic">{errMsg}</span>
            </>
          );
        }}
      />
    </>
  );
};

export const SelectOption = <T extends FieldValues>({
  name,
  className = "",
  errMsg = "",
  control,
  options,
}: SelectOptionProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <select
                id={name}
                {...field}
                className={`border border-gray-300 shadow py-2 px-5 w-full rounded-md focus:ring-0 bg-white placeholder:italic placeholder:text-gray-400 ${className}`}
              >
                <option value="">-- Select Any One --</option>
                {options &&
                  options.map((option: SingleOptionType, i: number) => {
                    return (
                      <option key={i} value={option.value as string}>
                        {option.label}
                      </option>
                    );
                  })}
              </select>
              <span className="text-red-700 text-sm italic">{errMsg}</span>
            </>
          );
        }}
      />
    </>
  );
};

export const FileUpload = <T extends FieldValues>({name,className = "",errMsg = "",control}: InputProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <input
                type={'file'}
                id={name}
                onChange={(e) => {
                  const files = Object.values(e.target.files as FileList)
                  field.onChange(files[0])
                }}
                className={`border border-gray-300 shadow py-2 px-5 w-full rounded-md focus:ring-0 bg-white placeholder:italic placeholder:text-gray-400 ${className}`}
              />
              <span className="text-red-700 text-sm italic">{errMsg}</span>
            </>
          );
        }}
      />
    </>
  );
};