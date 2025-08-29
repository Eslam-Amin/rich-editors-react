import { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Override the toolbar icons with your own SVG/Icon
const icons = Quill.import("ui/icons");
icons["bold"] = "<span style='font-weight:bold;'>B</span>";
icons["italic"] = "<span style='font-style:italic;'>I</span>";
icons["underline"] = "<u>U</u>";
icons["color"] =
  "<span style='background-color: #000; color: black; padding: 2px 4px; border-radius: 2px; font-size: 10px;'>C</span>";
icons["divider"] =
  "<span style='display: inline-block; width: 20px; height: 2px; background: linear-gradient(to right, #6b2626, #8b4513); border-radius: 1px; margin: 0 2px;'></span>";

// Custom divider blot
class DividerBlot extends Quill.import("blots/block") {
  static blotName = "divider";
  static tagName = "hr";

  static create() {
    const node = super.create();
    node.style.border = "none";
    node.style.borderTop = "1px solid #6b2626";
    node.style.margin = "0";
    return node;
  }
}

// Register the divider blot
Quill.register(DividerBlot);

// modules tell the editor what kinds of formatting are allowed inside your editor.
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }],
    ["link", "clean"],
    ["divider"]
  ],
  clipboard: {
    matchVisual: false
  }
};

// formats tell the editor what kinds of formatting are allowed inside your editor.
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "color",
  "background",
  "list",
  "bullet",
  "ordered",
  "link",
  "align",
  "divider"
];

export default function QuillEditor() {
  const [html, setHtml] = useState<string>("");

  return (
    <div className="card">
      <h2>React‑Quill</h2>
      <div className="editor-shell">
        <ReactQuill
          style={{ height: "200px" }}
          theme="snow"
          value={html}
          onChange={setHtml}
          modules={modules}
          formats={formats}
          placeholder="Write something..."
        />
      </div>

      <div className="save-row">
        <button
          className="btn"
          onClick={() => alert("HTML saved! Check preview below.")}
        >
          Save
        </button>
      </div>

      <h4>HTML Preview</h4>
      <div className="output" dangerouslySetInnerHTML={{ __html: html }} />
      <h4>Raw HTML</h4>
      <pre className="output">{html || "<empty>"}</pre>
    </div>
  );
}
