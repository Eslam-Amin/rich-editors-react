import React, { useMemo, useState } from "react";
import {
  createEditor,
  Descendant,
  Element,
  Text,
  Editor,
  Transforms
} from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";

// Simple Toolbar component
const Toolbar: React.FC = () => {
  const editor = useSlate();

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const toggleBlock = (format: string) => {
    const isActive = isBlockActive(editor, format);
    if (isActive) {
      // Convert back to paragraph
      Transforms.setNodes(editor, { type: "paragraph" } as any);
    } else {
      // Convert to the new block type
      Transforms.setNodes(editor, { type: format } as any);
    }
  };

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  };

  const isBlockActive = (editor: Editor, format: string) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        (n as any).type === format
    });

    return !!match;
  };

  return (
    <div
      style={{
        marginBottom: "8px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        alignItems: "center"
      }}
    >
      {/* Headers */}
      <select
        value={isBlockActive(editor, "heading") ? "heading" : "paragraph"}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "paragraph") {
            toggleBlock("paragraph");
          } else {
            toggleBlock("heading");
          }
        }}
        style={{
          padding: "4px 8px",
          border: "1px solid #ccc",
          borderRadius: "3px",
          backgroundColor: "#fff",
          cursor: "pointer",
          fontSize: "12px",
          minWidth: "80px"
        }}
      >
        <option value="paragraph">Normal</option>
        <option value="heading">Heading</option>
      </select>

      {/* Lists */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isBlockActive(editor, "bulleted-list")
            ? "#007bff"
            : "#fff",
          color: isBlockActive(editor, "bulleted-list") ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("bulleted-list");
        }}
      >
        • List
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isBlockActive(editor, "numbered-list")
            ? "#007bff"
            : "#fff",
          color: isBlockActive(editor, "numbered-list") ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("numbered-list");
        }}
      >
        1. List
      </button>

      {/* Text formatting */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isMarkActive(editor, "bold") ? "#007bff" : "#fff",
          color: isMarkActive(editor, "bold") ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark("bold");
        }}
      >
        B
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isMarkActive(editor, "italic") ? "#007bff" : "#fff",
          color: isMarkActive(editor, "italic") ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          fontStyle: "italic"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark("italic");
        }}
      >
        I
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isMarkActive(editor, "underline")
            ? "#007bff"
            : "#fff",
          color: isMarkActive(editor, "underline") ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          textDecoration: "underline"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark("underline");
        }}
      >
        U
      </button>

      {/* Emoji button */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          editor.insertText("🔥");
        }}
      >
        😀
      </button>
    </div>
  );
};

const SlateEditor: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "Start writing..." }] } as any
  ]);
  const [html, setHtml] = useState<string>("");

  // Simple HTML export
  const saveAsHtml = () => {
    const generatedHtml = value
      .map((node) => {
        if (Element.isElement(node)) {
          const element = node as any;
          if (element.type === "paragraph") {
            return `<p>${element.children
              .map((child: any) => {
                if (Text.isText(child)) {
                  let text = child.text;
                  if ((child as any).bold) text = `<strong>${text}</strong>`;
                  if ((child as any).italic) text = `<em>${text}</em>`;
                  if ((child as any).underline) text = `<u>${text}</u>`;
                  return text;
                }
                return "";
              })
              .join("")}</p>`;
          } else if (element.type === "heading") {
            return `<h2>${element.children
              .map((child: any) => {
                if (Text.isText(child)) {
                  let text = child.text;
                  if ((child as any).bold) text = `<strong>${text}</strong>`;
                  if ((child as any).italic) text = `<em>${text}</em>`;
                  if ((child as any).underline) text = `<u>${text}</u>`;
                  return text;
                }
                return "";
              })
              .join("")}</h2>`;
          } else if (element.type === "bulleted-list") {
            return `<ul>${element.children
              .map((child: any) => {
                if (
                  Element.isElement(child) &&
                  (child as any).type === "list-item"
                ) {
                  return `<li>${(child as any).children
                    .map((grandChild: any) => {
                      if (Text.isText(grandChild)) {
                        let text = grandChild.text;
                        if ((grandChild as any).bold)
                          text = `<strong>${text}</strong>`;
                        if ((grandChild as any).italic)
                          text = `<em>${text}</em>`;
                        if ((grandChild as any).underline)
                          text = `<u>${text}</u>`;
                        return text;
                      }
                      return "";
                    })
                    .join("")}</li>`;
                }
                return "";
              })
              .join("")}</ul>`;
          } else if (element.type === "numbered-list") {
            return `<ol>${element.children
              .map((child: any) => {
                if (
                  Element.isElement(child) &&
                  (child as any).type === "list-item"
                ) {
                  return `<li>${(child as any).children
                    .map((grandChild: any) => {
                      if (Text.isText(grandChild)) {
                        let text = grandChild.text;
                        if ((grandChild as any).bold)
                          text = `<strong>${text}</strong>`;
                        if ((grandChild as any).italic)
                          text = `<em>${text}</em>`;
                        if ((grandChild as any).underline)
                          text = `<u>${text}</u>`;
                        return text;
                      }
                      return "";
                    })
                    .join("")}</li>`;
                }
                return "";
              })
              .join("")}</ol>`;
          }
        }
        return "";
      })
      .join("");

    setHtml(generatedHtml);
    alert("HTML saved! Check preview below.");
  };

  return (
    <div className="card">
      <h2>Slate</h2>

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
            href="https://www.npmjs.com/package/slate"
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
            href="https://docs.slatejs.org/"
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
            href="https://github.com/ianstormtaylor/slate"
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

      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Toolbar />
        <Editable
          placeholder="Write something..."
          style={{
            minHeight: "200px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff"
          }}
        />
      </Slate>
      <div className="save-row">
        <button className="btn" onClick={saveAsHtml}>
          Save as HTML
        </button>
      </div>
      <h4>HTML Preview</h4>
      <div className="output" dangerouslySetInnerHTML={{ __html: html }} />
      <h4>Raw HTML</h4>
      <pre className="output">{html || "<empty>"}</pre>
    </div>
  );
};

export default SlateEditor;
