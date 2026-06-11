export type NodeKind = "client" | "service" | "queue" | "db" | "external";

export type DiagramNode = Readonly<{
  id: string;
  label: string;
  sublabel?: string;
  /** Top-left coordinates in the 800×320 diagram space. */
  x: number;
  y: number;
  kind: NodeKind;
}>;

export type DiagramEdge = Readonly<{
  from: string;
  to: string;
  label?: string;
}>;

export type Diagram = Readonly<{
  id: string;
  name: string;
  context: string;
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
  decisions: readonly string[];
}>;

export const NODE_W = 150;
export const NODE_H = 52;

export const diagrams: readonly Diagram[] = [
  {
    id: "gst-pipeline",
    name: "GST Filing Pipeline",
    context:
      "OptoTax at OPEN: a compliance pipeline between thousands of businesses and government tax APIs — built for auditability, retries, and async report generation.",
    nodes: [
      { id: "spa", label: "React SPA", sublabel: "Zustand · ShadCN", x: 24, y: 36, kind: "client" },
      { id: "bff", label: "Node.js BFF", sublabel: "Express · auth · RBAC", x: 220, y: 36, kind: "service" },
      { id: "core", label: "Core Services", sublabel: "Spring Boot", x: 416, y: 36, kind: "service" },
      { id: "gstn", label: "GSTN APIs", sublabel: "government", x: 612, y: 36, kind: "external" },
      { id: "db", label: "MySQL", sublabel: "filings · notices", x: 220, y: 196, kind: "db" },
      { id: "jobs", label: "Export Queue", sublabel: "SQS · async jobs", x: 416, y: 196, kind: "queue" },
      { id: "worker", label: "Report Worker", sublabel: "exports → S3", x: 612, y: 196, kind: "service" },
    ],
    edges: [
      { from: "spa", to: "bff", label: "REST" },
      { from: "bff", to: "core" },
      { from: "core", to: "gstn", label: "GSTR sync" },
      { from: "core", to: "db", label: "persist" },
      { from: "core", to: "jobs", label: "enqueue" },
      { from: "jobs", to: "worker", label: "consume" },
    ],
    decisions: [
      "BFF isolates the SPA from service churn — frontend contracts stayed stable through two backend refactors.",
      "Exports run as async queue jobs: large report generation never blocks an API thread or a user.",
      "Notice lifecycle is an explicit state machine persisted in MySQL — every government interaction is auditable.",
    ],
  },
  {
    id: "notice-tracking",
    name: "Event-Driven Notice Tracking",
    context:
      "Government APIs emit unreliable, out-of-order signals. The tracking system treats every notice update as an event, making failures observable instead of silent.",
    nodes: [
      { id: "src", label: "GSTN Webhooks", sublabel: "+ scheduled poller", x: 24, y: 36, kind: "external" },
      { id: "ingest", label: "Ingest Service", sublabel: "dedupe · normalize", x: 220, y: 36, kind: "service" },
      { id: "kafka", label: "Kafka", sublabel: "notice-events topic", x: 416, y: 36, kind: "queue" },
      { id: "status", label: "Status Consumer", sublabel: "state transitions", x: 612, y: 36, kind: "service" },
      { id: "store", label: "Notice Store", sublabel: "MySQL · event log", x: 416, y: 196, kind: "db" },
      { id: "alerts", label: "Alert Service", sublabel: "thresholds · SLAs", x: 612, y: 196, kind: "service" },
    ],
    edges: [
      { from: "src", to: "ingest", label: "push + pull" },
      { from: "ingest", to: "kafka", label: "publish" },
      { from: "kafka", to: "status", label: "consume" },
      { from: "status", to: "store", label: "append" },
      { from: "status", to: "alerts", label: "on failure" },
    ],
    decisions: [
      "Poller backs up webhooks — when the government endpoint drops events, reconciliation still converges.",
      "Kafka decouples ingestion rate from processing rate; consumers replay the topic after deploys.",
      "Append-only event log gave a 40% cut in resolution time: support reads the timeline, not the logs.",
    ],
  },
  {
    id: "offline-sync",
    name: "Offline-First Desktop Sync",
    context:
      "Smart Food Safe auditors work inside facilities with no connectivity. The Electron suite treats offline as the default state, not the error state.",
    nodes: [
      { id: "ui", label: "Electron App", sublabel: "shared React core", x: 24, y: 36, kind: "client" },
      { id: "local", label: "Local Store", sublabel: "optimistic writes", x: 24, y: 196, kind: "db" },
      { id: "queue", label: "Sync Queue", sublabel: "batched · retries", x: 220, y: 116, kind: "queue" },
      { id: "api", label: "REST API", sublabel: "Node.js · Express", x: 416, y: 116, kind: "service" },
      { id: "resolver", label: "Merge Engine", sublabel: "field-level conflicts", x: 612, y: 36, kind: "service" },
      { id: "mongo", label: "MongoDB", sublabel: "indexed · pipelines", x: 612, y: 196, kind: "db" },
    ],
    edges: [
      { from: "ui", to: "local", label: "write-through" },
      { from: "local", to: "queue", label: "enqueue" },
      { from: "queue", to: "api", label: "batch sync" },
      { from: "api", to: "resolver", label: "on conflict" },
      { from: "api", to: "mongo", label: "persist" },
      { from: "resolver", to: "mongo", label: "merge" },
    ],
    decisions: [
      "Field-level merge over last-write-wins — audit data can't silently lose an inspector's edits.",
      "Queue-based sync has simpler failure semantics than sockets in low-connectivity environments.",
      "Aggregation pipelines moved reporting compute into MongoDB, cutting query latency 40%.",
    ],
  },
] as const;
