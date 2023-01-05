// deno-lint-ignore-file no-explicit-any
function noop() {}

function getOrCreateModel(monaco: any, value: any, language: any, path: any) {
  return getModel(monaco, path) || createModel(monaco, value, language, path);
}

function getModel(monaco: any, path: any) {
  return monaco
    .editor
    .getModel(createModelUri(monaco, path));
}

function createModel(monaco: any, value: any, language: any, path: any) {
  return monaco
    .editor
    .createModel(value, language, path && createModelUri(monaco, path));
}

function createModelUri(monaco: any, path: any) {
  return monaco.Uri.parse(path);
}

function isUndefined(input: any) {
  return input === undefined;
}

export { getOrCreateModel, isUndefined, noop };
