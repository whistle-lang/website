// deno-lint-ignore-file no-explicit-any
// ported from https://github.com/suren-atoyan/monaco-react

import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import PropTypes from "https://esm.sh/prop-types@15.8.1";
import loader from "https://esm.sh/@monaco-editor/loader@1.3.2";

import MonacoContainer from "./MonacoContainer.tsx";
import useMount from "./useMount.ts";
import useUpdate from "./useUpdate.ts";
import usePrevious from "./usePrevious.ts";
import { getOrCreateModel, isUndefined, noop } from "../utils.ts";

const viewStates = new Map();

export default function Editor({
  defaultValue,
  defaultLanguage,
  defaultPath,
  value,
  language,
  path,
  /* === */
  theme,
  line,
  loading,
  options,
  overrideServices,
  saveViewState,
  keepCurrentModel,
  /* === */
  width,
  height,
  className,
  wrapperProps,
  /* === */
  beforeMount,
  onMount,
  onChange,
  onValidate,
}: any) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isMonacoMounting, setIsMonacoMounting] = useState(true);
  const monacoRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const onMountRef = useRef<any>(onMount);
  const beforeMountRef = useRef<any>(beforeMount);
  const subscriptionRef = useRef<any>(null);
  const valueRef = useRef<any>(value);
  const previousPath = usePrevious(path);
  const preventCreation = useRef<any>(false);

  useMount(() => {
    const cancelable = loader.init();

    cancelable
      .then((
        monaco: any,
      ) => ((monacoRef.current = monaco) && setIsMonacoMounting(false)))
      .catch((error: any) =>
        error?.type !== "cancelation" &&
        console.error("Monaco initialization: error:", error)
      );

    return () => editorRef.current ? disposeEditor() : cancelable.cancel();
  });

  useUpdate(
    () => {
      const model = getOrCreateModel(
        monacoRef.current,
        defaultValue || value,
        defaultLanguage || language,
        path,
      );

      if (model !== editorRef.current!.getModel()) {
        saveViewState &&
          viewStates.set(previousPath, editorRef.current.saveViewState());
        editorRef.current.setModel(model);
        saveViewState &&
          editorRef.current.restoreViewState(viewStates.get(path));
      }
    },
    [path],
    isEditorReady,
  );

  useUpdate(
    () => {
      editorRef.current.updateOptions(options);
    },
    [options],
    isEditorReady,
  );

  useUpdate(
    () => {
      if (
        editorRef.current.getOption(
          monacoRef.current.editor.EditorOption.readOnly,
        )
      ) {
        editorRef.current.setValue(value);
      } else {
        if (value !== editorRef.current.getValue()) {
          editorRef.current.executeEdits("", [{
            range: editorRef.current.getModel().getFullModelRange(),
            text: value,
            forceMoveMarkers: true,
          }]);

          editorRef.current.pushUndoStop();
        }
      }
    },
    [value],
    isEditorReady,
  );

  useUpdate(
    () => {
      monacoRef.current.editor.setModelLanguage(
        editorRef.current.getModel(),
        language,
      );
    },
    [language],
    isEditorReady,
  );

  useUpdate(
    () => {
      // reason for undefined check: https://github.com/suren-atoyan/monaco-react/pull/188
      if (!isUndefined(line)) {
        editorRef.current.revealLine(line);
      }
    },
    [line],
    isEditorReady,
  );

  useUpdate(
    () => {
      monacoRef.current.editor.setTheme(theme);
    },
    [theme],
    isEditorReady,
  );

  const createEditor = useCallback(() => {
    if (!preventCreation.current) {
      beforeMountRef.current(monacoRef.current);
      const autoCreatedModelPath = path || defaultPath;

      const defaultModel = getOrCreateModel(
        monacoRef.current,
        value || defaultValue,
        defaultLanguage || language,
        autoCreatedModelPath,
      );

      editorRef.current = monacoRef.current.editor.create(
        containerRef.current,
        {
          model: defaultModel,
          automaticLayout: true,
          ...options,
        },
        overrideServices,
      );

      saveViewState &&
        editorRef.current.restoreViewState(
          viewStates.get(autoCreatedModelPath),
        );

      monacoRef.current.editor.setTheme(theme);

      setIsEditorReady(true);
      preventCreation.current = true;
    }
  }, [
    defaultValue,
    defaultLanguage,
    defaultPath,
    value,
    language,
    path,
    options,
    overrideServices,
    saveViewState,
    theme,
  ]);

  useEffect(() => {
    if (isEditorReady) {
      onMountRef.current(
        editorRef.current,
        monacoRef.current,
      );
    }
  }, [isEditorReady]);

  useEffect(() => {
    !isMonacoMounting && !isEditorReady && createEditor();
  }, [isMonacoMounting, isEditorReady, createEditor]);

  // subscription
  // to avoid unnecessary updates (attach - dispose listener) in subscription
  valueRef.current = value;

  // onChange
  useEffect(() => {
    if (isEditorReady && onChange) {
      subscriptionRef.current?.dispose();
      subscriptionRef.current = editorRef.current?.onDidChangeModelContent(
        (event: any) => {
          onChange(editorRef.current.getValue(), event);
        },
      );
    }
  }, [isEditorReady, onChange]);

  // onValidate
  useEffect(() => {
    if (isEditorReady) {
      const changeMarkersListener = monacoRef.current.editor.onDidChangeMarkers(
        (uris: any) => {
          const editorUri = editorRef.current.getModel()?.uri;

          if (editorUri) {
            const currentEditorHasMarkerChanges = uris.find((uri: any) =>
              uri.path === editorUri.path
            );
            if (currentEditorHasMarkerChanges) {
              const markers = monacoRef.current.editor.getModelMarkers({
                resource: editorUri,
              });
              onValidate?.(markers);
            }
          }
        },
      );

      return () => {
        changeMarkersListener?.dispose();
      };
    }
  }, [isEditorReady, onValidate]);

  function disposeEditor() {
    subscriptionRef.current?.dispose();

    if (keepCurrentModel) {
      saveViewState && viewStates.set(path, editorRef.current.saveViewState());
    } else {
      editorRef.current.getModel()?.dispose();
    }

    editorRef.current.dispose();
  }

  return (
    <MonacoContainer
      width={width}
      height={height}
      isEditorReady={isEditorReady}
      loading={loading}
      _ref={containerRef}
      className={className}
      wrapperProps={wrapperProps}
    />
  );
}

Editor.propTypes = {
  defaultValue: PropTypes.string,
  defaultPath: PropTypes.string,
  defaultLanguage: PropTypes.string,
  value: PropTypes.string,
  language: PropTypes.string,
  path: PropTypes.string,
  /* === */
  theme: PropTypes.string,
  line: PropTypes.number,
  loading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  options: PropTypes.object,
  overrideServices: PropTypes.object,
  saveViewState: PropTypes.bool,
  keepCurrentModel: PropTypes.bool,
  /* === */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  wrapperProps: PropTypes.object,
  /* === */
  beforeMount: PropTypes.func,
  onMount: PropTypes.func,
  onChange: PropTypes.func,
  onValidate: PropTypes.func,
};

Editor.defaultProps = {
  theme: "light",
  loading: "Loading...",
  options: {},
  overrideServices: {},
  saveViewState: true,
  keepCurrentModel: false,
  /* === */
  width: "100%",
  height: "100%",
  wrapperProps: {},
  /* === */
  beforeMount: noop,
  onMount: noop,
  onValidate: noop,
};
