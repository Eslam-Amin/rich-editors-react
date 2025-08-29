import React, { useMemo, useState } from "react";
import { createEditor, Descendant, Element, Text, Editor } from "slate";
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

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
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
        gap: "4px"
      }}
    >
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

  // Simple HTML export
  const saveAsHtml = () => {
    const html = value
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
          }
        }
        return "";
      })
      .join("");
    alert(html);
  };

  return (
    <div>
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
      <button
        onClick={saveAsHtml}
        style={{
          marginTop: "8px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Save as HTML
      </button>
    </div>
  );
};

export default SlateEditor;
