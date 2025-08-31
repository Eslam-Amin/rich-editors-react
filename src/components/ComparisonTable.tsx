import React from "react";

const ComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      aspect: "Setup Difficulty",
      quill: {
        rating: 1,
        text: "EASY",
        description: "Minimal configuration required"
      },
      slate: {
        rating: 4,
        text: "MEDIUM to HARD",
        description: "Requires significant configuration"
      },
      lexical: {
        rating: 2,
        text: "MEDIUM",
        description: "Moderate configuration required"
      }
    },
    {
      aspect: "Learning Curve",
      quill: {
        rating: 1,
        text: "Very Low",
        description: "Plug-and-play functionality"
      },
      slate: {
        rating: 4,
        text: "Steep",
        description: "Especially for complex features"
      },
      lexical: {
        rating: 2,
        text: "Moderate",
        description: "Good balance of features and flexibility"
      }
    },
    {
      aspect: "Customization",
      quill: {
        rating: 2,
        text: "Limited",
        description: "Sufficient for most use cases"
      },
      slate: {
        rating: 5,
        text: "Extremely Flexible",
        description: "Complete control over editor behavior"
      },
      lexical: {
        rating: 4,
        text: "Good Balance",
        description: "Flexible but easier than Slate"
      }
    },
    {
      aspect: "Performance",
      quill: {
        rating: 4,
        text: "Good",
        description: "Optimized for standard use"
      },
      slate: {
        rating: 3,
        text: "Variable",
        description: "Depends on implementation"
      },
      lexical: {
        rating: 5,
        text: "Excellent",
        description: "Performance-first design"
      }
    },
    {
      aspect: "Bundle Size",
      quill: {
        rating: 3,
        text: "Medium",
        description: "Includes many built-in features"
      },
      slate: {
        rating: 4,
        text: "Small",
        description: "Minimal core, add what you need"
      },
      lexical: {
        rating: 5,
        text: "Very Small",
        description: "Modular architecture"
      }
    },
    {
      aspect: "Community",
      quill: {
        rating: 5,
        text: "Large",
        description: "Mature ecosystem, many resources"
      },
      slate: {
        rating: 4,
        text: "Active",
        description: "Good community support"
      },
      lexical: {
        rating: 3,
        text: "Growing",
        description: "Facebook-backed, newer library"
      }
    },
    {
      aspect: "Documentation",
      quill: {
        rating: 5,
        text: "Excellent",
        description: "Comprehensive and clear"
      },
      slate: { rating: 3, text: "Good", description: "Technical but thorough" },
      lexical: {
        rating: 4,
        text: "Very Good",
        description: "Modern and well-structured"
      }
    },
    {
      aspect: "Production Ready",
      quill: {
        rating: 5,
        text: "Yes",
        description: "Battle-tested and stable"
      },
      slate: {
        rating: 4,
        text: "Yes",
        description: "Stable but requires expertise"
      },
      lexical: {
        rating: 4,
        text: "Yes",
        description: "Facebook-backed, actively developed"
      }
    }
  ];

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return "#28a745"; // Green for good
    if (rating <= 3) return "#ffc107"; // Yellow for medium
    return "#dc3545"; // Red for challenging
  };

  return (
    <div className="card">
      <h2>📊 Detailed Package Comparison</h2>

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
          📚 Quick Reference Links
        </h4>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href="https://www.npmjs.com/package/react-quill"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          >
            📦 React-Quill
          </a>
          <a
            href="https://www.npmjs.com/package/slate"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          >
            📦 Slate
          </a>
          <a
            href="https://www.npmjs.com/package/lexical"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "6px 12px",
              backgroundColor: "#6f42c1",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          >
            📦 Lexical
          </a>
        </div>
      </div>

      {/* Comparison Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px"
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "left",
                  minWidth: "150px"
                }}
              >
                Aspect
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                  minWidth: "200px"
                }}
              >
                React-Quill
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                  minWidth: "200px"
                }}
              >
                Slate
              </th>
              <th
                style={{
                  padding: "12px",
                  border: "1px solid #dee2e6",
                  textAlign: "center",
                  minWidth: "200px"
                }}
              >
                Lexical
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f9fa"
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold"
                  }}
                >
                  {row.aspect}
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    textAlign: "center"
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "18px" }}>
                      {renderStars(row.quill.rating)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: getRatingColor(row.quill.rating),
                      marginBottom: "4px"
                    }}
                  >
                    {row.quill.text}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    {row.quill.description}
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    textAlign: "center"
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "18px" }}>
                      {renderStars(row.slate.rating)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: getRatingColor(row.slate.rating),
                      marginBottom: "4px"
                    }}
                  >
                    {row.slate.text}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    {row.slate.description}
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    textAlign: "center"
                  }}
                >
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "18px" }}>
                      {renderStars(row.lexical.rating)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: getRatingColor(row.lexical.rating),
                      marginBottom: "4px"
                    }}
                  >
                    {row.lexical.text}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    {row.lexical.description}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Guide */}
      <div style={{ marginTop: "24px" }}>
        <h3>🎯 When to Choose Which Editor?</h3>

        <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#e3f2fd",
              borderRadius: "8px",
              border: "1px solid #bbdefb"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#1976d2" }}>
              Choose React-Quill if:
            </h4>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>You need a rich text editor quickly</li>
              <li>You want extensive built-in features</li>
              <li>You prefer minimal configuration</li>
              <li>You need a stable, production-ready solution</li>
              <li>Your team has limited time for customization</li>
            </ul>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "#fff3e0",
              borderRadius: "8px",
              border: "1px solid #ffcc02"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#f57c00" }}>
              Choose Slate if:
            </h4>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>You need complete control over editor behavior</li>
              <li>You're building complex editing workflows</li>
              <li>You have time for extensive customization</li>
              <li>You need framework-agnostic solutions</li>
              <li>Your team has strong JavaScript/React skills</li>
            </ul>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "#f3e5f5",
              borderRadius: "8px",
              border: "1px solid #ce93d8"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", color: "#7b1fa2" }}>
              Choose Lexical if:
            </h4>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              <li>Performance is critical for your application</li>
              <li>You want modern React patterns</li>
              <li>You need a good balance of features and flexibility</li>
              <li>You're building new applications</li>
              <li>You prefer Facebook-backed solutions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Architecture Comparison */}
      <div style={{ marginTop: "24px" }}>
        <h3>🏗️ Architecture Comparison</h3>
        <div style={{ display: "grid", gap: "16px", marginTop: "16px" }}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #dee2e6"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>React-Quill Architecture</h4>
            <pre style={{ margin: "0", fontSize: "12px", color: "#6c757d" }}>
              {`Quill Editor
├── Built-in Toolbar
├── Content Area
├── Built-in Plugins
└── HTML Output`}
            </pre>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #dee2e6"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Slate Architecture</h4>
            <pre style={{ margin: "0", fontSize: "12px", color: "#6c757d" }}>
              {`Slate Editor
├── Custom Toolbar
├── Content Area
├── Custom Plugins
├── Custom Renderers
└── Custom HTML Export`}
            </pre>
          </div>

          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #dee2e6"
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>Lexical Architecture</h4>
            <pre style={{ margin: "0", fontSize: "12px", color: "#6c757d" }}>
              {`Lexical Editor
├── Custom Toolbar
├── Content Area
├── Plugin System
├── State Management
└── HTML Generation`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
