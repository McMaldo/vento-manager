import React, { useState } from "react";
import type { Part, Process, Store } from "../../types/part";
import { useParams } from "react-router-dom";
import FaIcon from "../atom/FaIcon";
import ProcessCheck from "../atom/ProcessCheck";

// ── Demo data — replace with props/router param ──────────────────────────────
const DEMO_PART: Part = {
  id: "p1",
  title: "Parte 0001",
  description:
    "Pistón hidráulico de simple efecto para cilindros de baja presión. Fabricado en acero 4140 tratado térmicamente.",
  process: [
    { isCompleted: true, name: "Torneado" },
    { isCompleted: true, name: "Fresado" },
    { isCompleted: false, name: "Templado" },
    { isCompleted: false, name: "Rectificado" },
    { isCompleted: false, name: "Niquelado" },
  ],
  store: { id: 2, location: { rack: 3, column: 1, row: 4 } },
};

const ProgressBar: React.FC<{ done: number; total: number }> = ({
  done,
  total,
}) => {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-base rounded-full overflow-hidden">
        <div
          className="h-full bg-icon rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-icon w-10 text-right">
        {done} / {total}
      </span>
    </div>
  );
};

const ProcessRow: React.FC<{
  proc: Process;
  idx: number;
  onToggle: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
}> = ({ proc, idx, onToggle, onRename, onDelete }) => (
  <div className="group flex items-center gap-3 py-2 border-b border-btn-border last:border-0">
    <span className="text-xs text-font-light tabular-nums w-5 text-right shrink-0">
      {String(idx + 1).padStart(2, "0")}
    </span>
    <ProcessCheck
      partID={proc.name}
      item={proc}
      onToggle={onToggle}
      onChange={(e) => onRename(e.target.value)}
      className="flex-1"
    />
    <button
      onClick={onDelete}
      className="md:opacity-0 group-hover:opacity-100 transition-all bg-transparent border-none cursor-pointer p-1"
    >
      <FaIcon name="xmark" size="size-4" light />
    </button>
  </div>
);

const StoreField: React.FC<{
  label: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}> = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-icon uppercase tracking-widest">{label}</span>
    <input
      type="number"
      min={0}
      className="w-16 text-center text-lg font-light border-b border-btn-border bg-transparent outline-none pb-1 focus:border-icon transition-colors"
      value={value ?? ""}
      placeholder="—"
      onChange={(e) =>
        onChange(e.target.value === "" ? undefined : Number(e.target.value))
      }
    />
  </div>
);

const PartPage: React.FC<{
  part?: Part;
}> = ({ part: initialPart = DEMO_PART }) => {
  const { projectId, partId } = useParams();
  const [part, setPart] = useState<Part>(initialPart);

  const updateField = <K extends keyof Part>(field: K, value: Part[K]) =>
    setPart((prev) => ({ ...prev, [field]: value }));

  const toggleProc = (idx: number) =>
    setPart((prev) => ({
      ...prev,
      process: (prev.process ?? []).map((pr, i) =>
        i !== idx ? pr : { ...pr, isCompleted: !pr.isCompleted },
      ),
    }));

  const renameProc = (idx: number, name: string) =>
    setPart((prev) => ({
      ...prev,
      process: (prev.process ?? []).map((pr, i) =>
        i !== idx ? pr : { ...pr, name },
      ),
    }));

  const deleteProc = (idx: number) =>
    setPart((prev) => ({
      ...prev,
      process: (prev.process ?? []).filter((_, i) => i !== idx),
    }));

  const addProc = () =>
    setPart((prev) => ({
      ...prev,
      process: [
        ...(prev.process ?? []),
        { isCompleted: false, name: "Nuevo proceso" },
      ],
    }));

  const updateStore = (
    field: keyof Store["location"],
    value: number | undefined,
  ) =>
    setPart((prev) => ({
      ...prev,
      store: {
        id: prev.store?.id ?? 1,
        location: { ...(prev.store?.location ?? {}), [field]: value },
      },
    }));

  const updateStoreId = (id: number) =>
    setPart((prev) => ({
      ...prev,
      store: { id, location: prev.store?.location ?? {} },
    }));

  const procs = part.process ?? [];
  const done = procs.filter((p) => p.isCompleted).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* ID badge */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs tracking-widest text-icon uppercase">
          Pieza
        </span>
        <span className="text-xs font-mono text-font">
          #{projectId} - {partId}
        </span>
      </div>

      {/* Title */}
      <input
        className="w-full text-4xl font-light text-font bg-transparent border-none outline-none mb-4 tracking-tight"
        value={part.title}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="Título de la pieza"
      />

      {/* Description */}
      <textarea
        className="w-full text-font-light bg-transparent border-none outline-none resize-none leading-relaxed mb-4"
        value={part.description}
        rows={3}
        onChange={(e) => updateField("description", e.target.value)}
        placeholder="Descripción..."
      />

      {/* Image placeholder */}
      <div className="w-full h-48 bg-base border border-dashed border-btn-border rounded-lg flex flex-col items-center justify-center gap-2 mb-10 cursor-pointer hover:border-font-light transition-colors group">
        {part.img ? (
          <img
            src={part.img}
            alt={part.title}
            className="h-full w-full object-contain rounded-lg"
          />
        ) : (
          <>
            <FaIcon name="image" size="size-8" />
            <span className="text-xs text-font-light group-hover:text-icon transition-colors">
              Agregar imagen
            </span>
          </>
        )}
      </div>

      {/* Processes */}
      <section className="flex flex-col gap-4 mb-10">
        <h2 className="text-xs uppercase tracking-widest text-font">
          Procesos
        </h2>

        {procs.length > 0 && (
          <div className="">
            <ProgressBar done={done} total={procs.length} />
          </div>
        )}

        <div className="bg-base border border-btn-border rounded-lg px-4">
          {procs.length === 0 && (
            <p className="text-sm text-icon py-4 text-center">
              Sin procesos asignados
            </p>
          )}
          {procs.map((proc, i) => (
            <ProcessRow
              key={i}
              proc={proc}
              idx={i}
              onToggle={() => toggleProc(i)}
              onRename={(name) => renameProc(i, name)}
              onDelete={() => deleteProc(i)}
            />
          ))}
          <button
            onClick={addProc}
            className="py-2 w-full text-left text-sm text-font-light hover:text-icon bg-transparent border-none cursor-pointer transition-colors pl-7"
          >
            + Agregar Proceso
          </button>
        </div>
      </section>

      {/* Store */}
      <section>
        <h2 className="text-xs uppercase tracking-widest text-font mb-4">
          Almacén
        </h2>
        <div className="flex flex-col gap-4 bg-base border border-btn-border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-icon uppercase tracking-widest">
              ID
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => updateStoreId(n)}
                  className={`w-7 h-7 rounded text-xs border transition-colors cursor-pointer ${
                    part.store?.id === n
                      ? "bg-font text-base border-transparent text-bold"
                      : "bg-transparent text-font border-btn-border hover:border-icon"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-8">
            <StoreField
              label="Estante"
              value={part.store?.location.rack}
              onChange={(v) => updateStore("rack", v)}
            />
            <StoreField
              label="Columna"
              value={part.store?.location.column}
              onChange={(v) => updateStore("column", v)}
            />
            <StoreField
              label="Fila"
              value={part.store?.location.row}
              onChange={(v) => updateStore("row", v)}
            />
          </div>

          {part.store && (
            <div className="pt-4 border-t border-btn-border">
              <span className="text-xs text-font-light font-mono">
                Almacén {part.store.id}
                {part.store.location.rack != null
                  ? ` · Estante ${part.store.location.rack}`
                  : ""}
                {part.store.location.column != null
                  ? ` · Col ${part.store.location.column}`
                  : ""}
                {part.store.location.row != null
                  ? ` · Fila ${part.store.location.row}`
                  : ""}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PartPage;
