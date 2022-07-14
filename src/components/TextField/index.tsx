interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
}

const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <div>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input {...props} />
      {props.helperText && <p>{props.helperText}</p>}
    </div>
  );
};

export default TextField;
