import React, { useCallback, useMemo, useState } from "react";
import {
  createEditor,
  Descendant,
  Element,
  Text,
  Editor,
  Transforms
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  RenderElementProps,
  RenderLeafProps
} from "slate-react";

// Custom types for Slate
type CustomElement = {
  type:
    | "paragraph"
    | "heading"
    | "list-item"
    | "bulleted-list"
    | "numbered-list";
  children: CustomText[];
};
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
};

// Toolbar component with comprehensive formatting options
const Toolbar: React.FC = () => {
  const editor = useSlate();

  const toggleMark = (format: keyof Omit<CustomText, "text">) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const toggleBlock = (format: CustomElement["type"]) => {
    const isActive = isBlockActive(editor, format);
    const newProperties: Partial<Element> = {
      type: isActive ? "paragraph" : format
    };
    Transforms.setNodes<Element>(editor, newProperties);
  };

  const isMarkActive = (
    editor: Editor,
    format: keyof Omit<CustomText, "text">
  ) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const isBlockActive = (editor: Editor, format: CustomElement["type"]) => {
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
        gap: "4px"
      }}
    >
      {/* Headers */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isBlockActive(editor, "heading")
            ? "#007bff"
            : "#fff",
          color: isBlockActive(editor, "heading") ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer"
        }}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock("heading");
        }}
      >
        H
      </button>

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

      {/* Color picker */}
      <input
        type="color"
        style={{
          width: "32px",
          height: "32px",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer"
        }}
        onChange={(event) => {
          Editor.addMark(editor, "color", event.target.value);
        }}
        title="Text Color"
      />

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

// Element renderer
const ElementComponent: React.FC<RenderElementProps> = ({
  attributes,
  children,
  element
}) => {
  switch ((element as any).type) {
    case "heading":
      return <h2 {...attributes}>{children}</h2>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// Leaf renderer for text formatting
const LeafComponent: React.FC<RenderLeafProps> = ({
  attributes,
  children,
  leaf
}) => {
  let element = children;

  if ((leaf as any).bold) {
    element = <strong>{element}</strong>;
  }

  if ((leaf as any).italic) {
    element = <em>{element}</em>;
  }

  if ((leaf as any).underline) {
    element = <u>{element}</u>;
  }

  if ((leaf as any).color) {
    element = <span style={{ color: (leaf as any).color }}>{element}</span>;
  }

  return <span {...attributes}>{element}</span>;
};

const SlateEditor: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "Start writing..." }] }
  ]);

  // 🔥 save as HTML
  const saveAsHtml = () => {
    const html = value
      .map((node) => {
        if (Element.isElement(node)) {
          const element = node as any; // Type assertion for compatibility
          if (element.type === "paragraph") {
            return `<p>${element.children
              .map((child: any) => {
                if (Text.isText(child)) {
                  let text = child.text;
                  if (child.bold) text = `<strong>${text}</strong>`;
                  if (child.italic) text = `<em>${text}</em>`;
                  if (child.underline) text = `<u>${text}</u>`;
                  if (child.color)
                    text = `<span style="color: ${child.color}">${text}</span>`;
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
                  if (child.bold) text = `<strong>${text}</strong>`;
                  if (child.italic) text = `<em>${text}</em>`;
                  if (child.underline) text = `<u>${text}</u>`;
                  if (child.color)
                    text = `<span style="color: ${child.color}">${text}</span>`;
                  return text;
                }
                return "";
              })
              .join("")}</h2>`;
          } else if (element.type === "bulleted-list") {
            return `<ul>${element.children
              .map((child: any) => {
                if (Element.isElement(child) && child.type === "list-item") {
                  return `<li>${child.children
                    .map((grandChild: any) => {
                      if (Text.isText(grandChild)) {
                        let text = grandChild.text;
                        if (grandChild.bold) text = `<strong>${text}</strong>`;
                        if (grandChild.italic) text = `<em>${text}</em>`;
                        if (grandChild.underline) text = `<u>${text}</u>`;
                        if (grandChild.color)
                          text = `<span style="color: ${grandChild.color}">${text}</span>`;
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
                if (Element.isElement(child) && child.type === "list-item") {
                  return `<li>${child.children
                    .map((grandChild: any) => {
                      if (Text.isText(grandChild)) {
                        let text = grandChild.text;
                        if (grandChild.bold) text = `<strong>${text}</strong>`;
                        if (grandChild.italic) text = `<em>${text}</em>`;
                        if (grandChild.underline) text = `<u>${text}</u>`;
                        if (grandChild.color)
                          text = `<span style="color: ${grandChild.color}">${text}</span>`;
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
    alert(html);
  };

  return (
    <div>
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Toolbar />
        <Editable
          placeholder="Write something..."
          renderElement={ElementComponent}
          renderLeaf={LeafComponent}
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
