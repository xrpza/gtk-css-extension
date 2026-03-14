// @ts-check
'use strict';

const vscode = require('vscode');

/**
 * Scans the document for all @define-color declarations and returns
 * CompletionItems for each discovered color name.
 *
 * @param {vscode.TextDocument} document
 * @returns {vscode.CompletionItem[]}
 */
function getColorCompletions(document) {
  const text = document.getText();
  // Match: @define-color <name> <value>;
  const defineColorRegex = /@define-color\s+([a-zA-Z_][a-zA-Z0-9_-]*)\s+([^;]+);/g;

  /** @type {Map<string, string>} name → value */
  const colors = new Map();
  let match;
  while ((match = defineColorRegex.exec(text)) !== null) {
    colors.set(match[1], match[2].trim());
  }

  return Array.from(colors.entries()).map(([name, value]) => {
    const item = new vscode.CompletionItem(
      `@${name}`,
      vscode.CompletionItemKind.Color
    );
    item.insertText = `@${name}`;
    item.detail = `GTK color: ${value}`;
    item.documentation = new vscode.MarkdownString(
      `**GTK Color Variable**\n\n\`@define-color ${name} ${value};\``
    );
    // Replace the @ the user already typed + whatever they typed after it
    item.filterText = `@${name}`;
    return item;
  });
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Completion provider: triggered by '@' in gtk-css files
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'gtk-css' },
    {
      provideCompletionItems(document, position) {
        // Check the character before the cursor: must be '@'
        const linePrefix = document.lineAt(position).text.slice(0, position.character);
        if (!linePrefix.endsWith('@') && !/@[a-zA-Z_][a-zA-Z0-9_-]*$/.test(linePrefix)) {
          return undefined;
        }
        return getColorCompletions(document);
      }
    },
    '@'   // Trigger character
  );

  context.subscriptions.push(completionProvider);
}

function deactivate() {}

module.exports = { activate, deactivate };
