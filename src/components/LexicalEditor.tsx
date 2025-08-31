import { useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";

import ToolbarPlugin from "./lexical/ToolbarPlugin";

// Simple error boundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default function LexicalEditor() {
  const [html, setHtml] = useState<string>("");

  const initialConfig = {
    namespace: "MyLexicalEditor",
    onError: (e: Error) => console.error(e),
    theme: {
      paragraph: "editor-paragraph"
    },
    nodes: [ListNode, ListItemNode, LinkNode]
  };

  return (
    <div className="card">
      <h2>Lexical</h2>

      {/* Documentation Links */}
      <div
        style={{
          marginBottom: "16px",
          padding: "12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          border: "1px solid #e9ecef"
        }}
      >
        <h4 style={{ margin: "0 0 8px 0", color: "#495057" }}>
          📚 Documentation & Resources
        </h4>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="https://www.npmjs.com/package/lexical"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            📦 npm Package
          </a>
          <a
            href="https://lexical.dev/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            🌐 Official Website
          </a>
          <a
            href="https://github.com/facebook/lexical"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              backgroundColor: "#6f42c1",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            📖 GitHub Repository
          </a>
        </div>
      </div>

      <LexicalComposer initialConfig={initialConfig}>
        <EditorInner onSaveHtml={setHtml} />
      </LexicalComposer>

      <div className="save-row">
        <small>Click "Save as HTML" inside the editor</small>
      </div>

      <h4>HTML Preview</h4>
      <div className="output" dangerouslySetInnerHTML={{ __html: html }} />
      <h4>Raw HTML</h4>
      <pre className="output">{html || "<empty>"}</pre>
    </div>
  );
}

function EditorInner({ onSaveHtml }: { onSaveHtml: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  return (
    <>
      <ToolbarPlugin editor={editor} />

      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="editor-input"
            style={{
              minHeight: "200px",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
              outline: "none"
            }}
          />
        }
        placeholder={
          <div
            style={{
              padding: "12px",
              color: "#999",
              position: "absolute",
              pointerEvents: "none",
              userSelect: "none"
            }}
          >
            Write something...
          </div>
        }
        ErrorBoundary={ErrorBoundary}
      />

      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
      <OnChangePlugin onChange={(_state: EditorState) => {}} />

      <div className="save-row">
        <button
          style={{
            marginTop: "8px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
          onClick={() => {
            editor.update(() => {
              const html = $generateHtmlFromNodes(editor);
              onSaveHtml(html);
            });
          }}
        >
          Save as HTML
        </button>
      </div>
    </>
  );
}
