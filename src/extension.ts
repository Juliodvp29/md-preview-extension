import * as vscode from 'vscode';
import { marked } from 'marked';
import hljs from 'highlight.js';

export function activate(context: vscode.ExtensionContext) {
	console.log('md-preview-extension is now active!');

	const disposable = vscode.commands.registerCommand('md-preview-extension.openPreview', () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showWarningMessage('No hay ningún archivo abierto.');
			return;
		}

		if (editor.document.languageId !== 'markdown') {
			vscode.window.showWarningMessage('Este archivo no es Markdown.');
			return;
		}

		// Crear el panel de preview al lado derecho
		const panel = vscode.window.createWebviewPanel(
			'mdPreview',
			'Preview: ' + editor.document.fileName.split(/[\\/]/).pop(),
			vscode.ViewColumn.Beside,
			{ enableScripts: false }
		);

		// Renderizar por primera vez
		panel.webview.html = renderMarkdown(editor.document.getText());

		// Actualizar en tiempo real mientras escribes
		const changeListener = vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document === editor.document) {
				panel.webview.html = renderMarkdown(e.document.getText());
			}
		});

		// Limpiar el listener cuando se cierra el panel
		panel.onDidDispose(() => changeListener.dispose());

		context.subscriptions.push(changeListener);
	});

	context.subscriptions.push(disposable);
}

// Configurar marked para usar highlight.js en el resaltado de código
marked.use({
  renderer: (() => {
    const renderer = new marked.Renderer();
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    };
    return renderer;
  })()
});

function renderMarkdown(md: string): string {
	const html = marked.parse(md) as string;

	return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MD Preview</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #c9d1d9;
      background-color: #0d1117;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1, h2, h3, h4, h5, h6 {
      color: #e6edf3;
      border-bottom: 1px solid #21262d;
      padding-bottom: 0.3em;
      margin-top: 1.5em;
    }
    a { color: #58a6ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 4px;
      padding: 0.2em 0.4em;
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 85%;
      color: #ff7b72;
    }
    pre {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 1rem;
      overflow-x: auto;
    }
    pre code {
      background: none;
      border: none;
      padding: 0;
      color: #c9d1d9;
      font-size: 100%;
    }
    blockquote {
      border-left: 4px solid #3d444d;
      color: #8b949e;
      margin: 0;
      padding: 0 1em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #30363d;
      padding: 6px 13px;
    }
    th { background: #161b22; color: #e6edf3; }
    tr:nth-child(even) { background: #161b22; }
    img { max-width: 100%; }
    hr { border-color: #21262d; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
}

export function deactivate() {}