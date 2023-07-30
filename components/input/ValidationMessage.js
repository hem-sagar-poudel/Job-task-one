import PropTypes from "prop-types";
import {entries, upperFirst} from "lodash";
import {ErrorMessage} from "@hookform/error-message";

const ValidationMessage = ({name, errors}) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({messages}) => {
        return messages
          ? entries(messages).map(([type, messages]) => (
              <div key={type} className="text-danger small">
                {upperFirst(messages)}
              </div>
            ))
          : null;
      }}
    />
  );
};

ValidationMessage.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.object,
};

export default ValidationMessage;

ValidationMessage.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.object,
};
