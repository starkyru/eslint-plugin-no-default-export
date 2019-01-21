

function create(context) {
  const preferNamed = 'Prefer named exports.';
  const noAliasDefault = (_ref) => {
    const local = _ref.local;
    return `Do not alias \`${local.name}\` as \`default\`. Just export ` + `\`${local.name}\` itself instead.`;
  };

  return {
    ExportDefaultDeclaration(node) {
      context.report({ node, message: preferNamed });
    },

    ExportNamedDeclaration(node) {
      node.specifiers.forEach(specifier => {
        if (specifier.type === 'ExportDefaultSpecifier' && specifier.exported.name === 'default') {
          context.report({ node, message: preferNamed });
        } else if (specifier.type === 'ExportSpecifier' && specifier.exported.name === 'default') {
          context.report({ node, message: noAliasDefault(specifier) });
        }
      });
    },
  };
}

module.exports = {
  create,
};
