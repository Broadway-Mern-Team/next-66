import { FormLabelProps } from "./form.contract";

export const FormLabel = ({htmlFor='', className='', children}: FormLabelProps) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`w-full lg:w-1/3 font-semibold text-lg ${className}`}
      >{children}</label>
    </>
  );
}