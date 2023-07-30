import ReactTableCustom from "./ReactTableCustom";

const TableHead = ({title, ...props}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="h-text-medium fw-semibold text-dark mb-1">{title}</h5>
        <button
          type="button"
          className="h-btn h-btn-sm h-btn-primary d-flex align-items-center gap-2 "
          onClick={props.onClick}
        >
          <span>{"btnName"}</span>
          {props.btnIcon ? props.btnIcon : <i className="bi bi-list"></i>}
        </button>
      </div>
    </>
  );
};

export const THead = ({title, ...props}) => {
  //props -> className, title
  return (
    <>
      <div className={`${props.className} `}>{title}</div>
    </>
  );
};
export const TData = ({title, ...props}) => {
  //props -> className, title
  return (
    <>
      <div className={`${props.className} `}>{title}</div>
    </>
  );
};

export {TableHead, ReactTableCustom};
