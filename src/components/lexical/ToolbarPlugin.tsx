import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  EditorState,
  LexicalEditor,
  COMMAND_PRIORITY_CRITICAL
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $createParagraphNode } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND
} from "@lexical/list";

export default function ToolbarPlugin({ editor }: { editor: LexicalEditor }) {
  const [blockType, setBlockType] = useState<"paragraph" | "h1" | "h2" | "h3">(
    "paragraph"
  );
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isInList, setIsInList] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getTopLevelElementOrThrow();
      const type = element.getType();

      if (type === "heading") {
        // @ts-ignore
        setBlockType(element.getTag());
      } else {
        setBlockType(type as any);
      }

      // Check if we're in a list
      const listParent = anchorNode.getParent();
      setIsInList(listParent?.getType() === "list");

      // Check text formatting
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, _newEditor) => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  const formatHeading = (tag: HeadingTagType | "paragraph") => {
    editor.update(() => {
      if (tag === "paragraph") {
        $setBlocksType($getSelection(), () => $createParagraphNode());
      } else {
        $setBlocksType($getSelection(), () => $createHeadingNode(tag));
      }
    });
  };

  const insertEmoji = (emoji: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertText(emoji);
      }
    });
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
      {/* Block Type Selector */}
      <select
        value={blockType}
        onChange={(e) => formatHeading(e.target.value as any)}
        style={{
          padding: "4px 8px",
          border: "1px solid #ccc",
          borderRadius: "3px",
          backgroundColor: "#fff",
          cursor: "pointer",
          fontSize: "12px"
        }}
      >
        <option value="paragraph">Normal text</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      {/* Text Formatting */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isBold ? "#007bff" : "#fff",
          color: isBold ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          fontWeight: "bold",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        title="Bold"
      >
        B
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isItalic ? "#007bff" : "#fff",
          color: isItalic ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          fontStyle: "italic",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        title="Italic"
      >
        I
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isUnderline ? "#007bff" : "#fff",
          color: isUnderline ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          textDecoration: "underline",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        title="Underline"
      >
        U
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isStrikethrough ? "#007bff" : "#fff",
          color: isStrikethrough ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          textDecoration: "line-through",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        title="Strikethrough"
      >
        S
      </button>

      {/* Lists */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isInList ? "#007bff" : "#fff",
          color: isInList ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "60px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
        title="Bullet List"
      >
        • List
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: isInList ? "#007bff" : "#fff",
          color: isInList ? "#fff" : "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "60px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
        title="Numbered List"
      >
        1. List
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "80px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }}
        title="Clear List"
      >
        Clear List
      </button>

      {/* Emoji Buttons */}
      <button
        style={{
          padding: "4px 8px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          insertEmoji("🔥");
        }}
        title="Fire Emoji"
      >
        🔥
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          insertEmoji("😀");
        }}
        title="Smile Emoji"
      >
        😀
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          insertEmoji("⭐");
        }}
        title="Star Emoji"
      >
        ⭐
      </button>

      <button
        style={{
          padding: "4px 8px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "3px",
          cursor: "pointer",
          minWidth: "32px"
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          insertEmoji("💡");
        }}
        title="Light Bulb Emoji"
      >
        💡
      </button>
    </div>
  );
}
