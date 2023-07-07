import * as vscode from 'vscode';
 
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('byte-counter.countlen', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);
            if (text) {
                showTextAboveSelection(`${text.length}byte`);
            } else {
                console.log('text not detected.');
            }
        }
    });
    context.subscriptions.push(disposable);
}


function showTextAboveSelection(text: string) {
  // 選択範囲の上にコメントを追加する
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const line = selection.start.line;
    const indent = editor.document.lineAt(line).firstNonWhitespaceCharacterIndex;
    const indentSpaces = ' '.repeat(indent);
    const languageId = editor.document.languageId;
    const commentText = getCommentSyntax(languageId) + ' ' + text;

    editor.edit(editBuilder => {
      editBuilder.insert(new vscode.Position(line, 0), `${indentSpaces}${commentText}\n`);
    });
  }
}


function getCommentSyntax(languageId: string) {
  // 言語ごとのコメント表記方法を返す
  switch (languageId) {
    case 'python':
      return '#';
    default:
      return '//';
  }
}