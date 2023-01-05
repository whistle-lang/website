// ported from https://github.com/suren-atoyan/monaco-react

import PropTypes from "https://esm.sh/prop-types@15.8.1";

import Loading from "./Loading.tsx";

const styles = {
  wrapper: {
    display: "flex",
    position: "relative",
    textAlign: "initial",
  },
  fullWidth: {
    width: "100%",
  },
  hide: {
    display: "none",
  },
};

// ** forwardref render functions do not support proptypes or defaultprops **
// one of the reasons why we use a separate prop for passing ref instead of using forwardref

function MonacoContainer({
  width,
  height,
  isEditorReady,
  loading,
  _ref,
  className,
  wrapperProps,
  // deno-lint-ignore no-explicit-any
}: any) {
  return (
    <section style={{ ...styles.wrapper, width, height }} {...wrapperProps}>
      {!isEditorReady && <Loading content={loading} />}
      <div
        ref={_ref}
        style={{ ...styles.fullWidth, ...(!isEditorReady && styles.hide) }}
        className={className}
      />
    </section>
  );
}

MonacoContainer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  loading:
    PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  isEditorReady: PropTypes.bool.isRequired,
  className: PropTypes.string,
  wrapperProps: PropTypes.object,
};

export default MonacoContainer;
