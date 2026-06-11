import { NODE_H, NODE_W, type Diagram, type DiagramNode, type NodeKind } from "./data";

const kindStyles: Record<NodeKind, { stroke: string; fill: string; chip: string }> = {
  client: { stroke: "hsl(243 90% 66% / 0.6)", fill: "hsl(243 90% 66% / 0.08)", chip: "UI" },
  service: { stroke: "hsl(240 6% 30%)", fill: "hsl(240 8% 9%)", chip: "SVC" },
  queue: { stroke: "hsl(262 88% 70% / 0.6)", fill: "hsl(262 88% 70% / 0.08)", chip: "MQ" },
  db: { stroke: "hsl(152 70% 45% / 0.55)", fill: "hsl(152 70% 45% / 0.07)", chip: "DB" },
  external: { stroke: "hsl(38 90% 60% / 0.55)", fill: "hsl(38 90% 60% / 0.06)", chip: "EXT" },
};

function center(node: DiagramNode): { cx: number; cy: number } {
  return { cx: node.x + NODE_W / 2, cy: node.y + NODE_H / 2 };
}

/**
 * Computes an edge path between node borders. Horizontal-ish connections
 * leave from the side; vertical-ish ones from the top/bottom edge.
 */
function edgePath(from: DiagramNode, to: DiagramNode): { d: string; mx: number; my: number } {
  const a = center(from);
  const b = center(to);
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const x1 = dx > 0 ? from.x + NODE_W : from.x;
    const x2 = dx > 0 ? to.x : to.x + NODE_W;
    const bend = (x2 - x1) / 2;
    return {
      d: `M ${x1} ${a.cy} C ${x1 + bend} ${a.cy}, ${x2 - bend} ${b.cy}, ${x2} ${b.cy}`,
      mx: (x1 + x2) / 2,
      my: (a.cy + b.cy) / 2 - 7,
    };
  }

  const y1 = dy > 0 ? from.y + NODE_H : from.y;
  const y2 = dy > 0 ? to.y : to.y + NODE_H;
  const bend = (y2 - y1) / 2;
  return {
    d: `M ${a.cx} ${y1} C ${a.cx} ${y1 + bend}, ${b.cx} ${y2 - bend}, ${b.cx} ${y2}`,
    mx: (a.cx + b.cx) / 2,
    my: (y1 + y2) / 2 - 6,
  };
}

/** Pure-SVG architecture diagram rendered from typed node/edge data. */
export function ArchitectureDiagram({ diagram }: Readonly<{ diagram: Diagram }>) {
  const nodeById = new Map(diagram.nodes.map((n) => [n.id, n]));

  return (
    <svg
      viewBox="0 0 786 284"
      role="img"
      aria-label={`Architecture diagram: ${diagram.name}`}
      className="h-auto w-full"
    >
      <defs>
        <marker
          id={`arrow-${diagram.id}`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="hsl(243 90% 66% / 0.7)" />
        </marker>
      </defs>

      {/* Edges under nodes */}
      {diagram.edges.map((edge) => {
        const from = nodeById.get(edge.from);
        const to = nodeById.get(edge.to);
        if (!from || !to) return null;
        const { d, mx, my } = edgePath(from, to);
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path
              d={d}
              fill="none"
              stroke="hsl(243 90% 66% / 0.45)"
              strokeWidth="1.5"
              className="edge-flow"
              markerEnd={`url(#arrow-${diagram.id})`}
            />
            {edge.label ? (
              <text
                x={mx}
                y={my}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="hsl(240 5% 62%)"
              >
                {edge.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {/* Nodes */}
      {diagram.nodes.map((node) => {
        const style = kindStyles[node.kind];
        return (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={NODE_W}
              height={NODE_H}
              rx="8"
              fill={style.fill}
              stroke={style.stroke}
              strokeWidth="1"
            />
            <text
              x={node.x + 12}
              y={node.y + 22}
              fontSize="12.5"
              fontWeight="600"
              fill="hsl(240 10% 96%)"
              fontFamily="var(--font-sans)"
            >
              {node.label}
            </text>
            {node.sublabel ? (
              <text
                x={node.x + 12}
                y={node.y + 38}
                fontSize="10"
                fill="hsl(240 5% 62%)"
                fontFamily="var(--font-mono)"
              >
                {node.sublabel}
              </text>
            ) : null}
            <text
              x={node.x + NODE_W - 10}
              y={node.y + 16}
              textAnchor="end"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              fill={style.stroke}
            >
              {style.chip}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
