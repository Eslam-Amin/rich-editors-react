import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import QuillEditor from "./components/QuillEditor";
import SlateEditor from "./components/SlateEditor";
import LexicalEditor from "./components/LexicalEditor";
import ComparisonTable from "./components/ComparisonTable";

export default function App() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/quill">React‑Quill</NavLink>
          <NavLink to="/slate">Slate</NavLink>
          <NavLink to="/lexical">Lexical</NavLink>
          <NavLink to="/comparison">📊 Comparison</NavLink>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/comparison" replace />} />
          <Route path="/comparison" element={<Navigate to="/comparison" />} />
          <Route path="/quill" element={<QuillEditor />} />
          <Route path="/slate" element={<SlateEditor />} />
          <Route path="/lexical" element={<LexicalEditor />} />
          <Route path="/comparison" element={<ComparisonTable />} />
        </Routes>
      </div>
    </>
  );
}
