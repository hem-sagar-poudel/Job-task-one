import {useState} from "react";
import ValidationMessage from "./ValidationMessage";

export default function Input({...props}) {
  const [value, setValue] = useState();
  const label = props.label;
  const attributes = {
    id: props.name,
    type: props.type ? props.type : "text",
    name: props.name ? props.name : "no-name",
    className: `form-control rounded-3 ${props.className} ${
      props.errors[props.name] ? "form-error" : ""
    }`,
    placeholder: props.placeholder,
    for: props.name ? props.name + "_input" : "example_input",
  };

  const registers = {
    ...props.register(props.name, {
      onChange: (e) => {
        setValue(e.target.value);
        if (props.onChange) {
          props.onChange(e);
        }
      },
      onBlur: (e) => {
        if (props.onBlur) {
          props.onBlur(e);
        }
      },
    }),
  };
  // console.log(props.errors);
  return (
    <>
      <div className="mb-2 input-box">
        {label && (
          <>
            <label for="exampleInputEmail1" class="form-label">
              {label}
              {props.required && (
                <>
                  <span className="text-danger">*</span>
                </>
              )}
            </label>
          </>
        )}
        {props.type == "textarea" ? (
          <>
            <textarea {...attributes} {...registers}></textarea>
          </>
        ) : (
          <>
            <input {...attributes} {...registers} />
          </>
        )}
        {props.message && (
          <>
            <span class="form-label small text-muted ps-3">
              {props.message}
            </span>
          </>
        )}
      </div>
      {props.errors && (
        <ValidationMessage name={props.name} errors={props.errors} />
      )}
    </>
  );
}
