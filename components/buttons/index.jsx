export function ButtonSubmit({className, label, disabled, spin, ...props}) {
  return (
    <>
      <button
        disabled={disabled}
        className={`btn btn-md btn-primary h-btn-primary w-100  transition-up  ${className}`}
        style={{minWidth: "80px !important", ...props.style}}
        {...props}
      >
        {disabled && spin ? (
          <div className="spinner-border text-light small" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          label
        )}
      </button>
    </>
  );
}
