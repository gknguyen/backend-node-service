module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Validate the structure of TypeORM EntitySchema',
      category: 'Data Model Standards',
      recommended: false,
    },
    schema: [], // No options
    messages: {
      missingTableColumnComment: "Required field 'comment'.",
    },
  },
  create(context) {
    return {
      Identifier(node) {
        if (
          node.name === 'EntitySchema' &&
          node.parent?.arguments?.[0]?.type === 'ObjectExpression'
        ) {
          const schemaObject = node.parent.arguments[0];
          const columnsProperty = schemaObject.properties.find(
            (prop) => prop.key?.name === 'columns',
          );
          if (columnsProperty.value.type === 'ObjectExpression') {
            columnsProperty.value.properties.forEach((column) => {
              if (
                column.type === 'Property' &&
                column.value.type === 'ObjectExpression' &&
                !column.value.properties.some((prop) => prop.key && prop.key.name === 'comment')
              ) {
                context.report({
                  node: column,
                  messageId: 'missingTableColumnComment',
                });
              }
            });
          }
        }
      },
    };
  },
};
