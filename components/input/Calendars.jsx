import ValidationMessage from "./ValidationMessage";
import {Calendar} from "primereact/calendar";

export default function Calendars({name, ...props}) {
  const label = props.label;
  return (
    <>
      <div className="mb-3">
        <label for="exampleInputEmail1" class="form-label ">
          {label}
          {props.required && (
            <>
              <span className="text-danger">*</span>
            </>
          )}
        </label>
        <div className=" prime-calendar">
          <Calendar
            className={`${props.className} input `}
            inputClassName={`${
              props.inputClassName
            } form-control rounded-3   bg-white input ${
              props.errors[name] ? "form-error" : ""
            }`}
            label={props.label ? props.label : "Calendar"}
            name={props.name}
            minDate={props.minDate ? props.minDate : ""}
            maxDate={props.maxDate ? props.maxDate : ""}
            value={props.value}
            onChange={props.onChange}
            showIcon
            placeholder={props.placeholder}
          ></Calendar>
          {props.message && (
            <>
              <span class="form-label small text-muted ps-3">
                {props.message}
              </span>
            </>
          )}
        </div>
      </div>
      {props.errors && <ValidationMessage name={name} errors={props.errors} />}
    </>
  );
}
