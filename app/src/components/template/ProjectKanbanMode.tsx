import React, { useState } from "react";
import FaIcon from "../atom/FaIcon";
import type { Column } from "../../types/column";
import ColKanbanMode from "./ColKanbanMode";
import { useProjectColumns } from "../../context/ProjectContext";
import useOnClickOutside from "../../hook/useOnClickOutside";

interface ColumnMenuPosition {
  columnId: string;
  top: number;
  left: number;
}

const KanbanMode: React.FC = () => {
  const { cols } = useProjectColumns();

  const [activeMenu, setActiveMenu] = useState<ColumnMenuPosition | null>(null);
  const [showColumnVisible, setShowColumnVisible] = useState<{
    [key: string]: boolean;
  }>({
    pedidos: true,
    proceso: true,
    almacen: true,
    demorados: true,
  });
  const [columnEditable, setColumnEditable] = useState<{
    [key: string]: boolean;
  }>({
    pedidos: false,
    proceso: false,
    almacen: false,
    demorados: false,
  });

  const menuRef = useOnClickOutside<HTMLElement>(() => setActiveMenu(null));
  const toggleColumnMenu = (
    columnId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();

    if (activeMenu?.columnId === columnId) {
      setActiveMenu(null);
    } else {
      setActiveMenu({
        columnId,
        top: rect.bottom + 8,
        left: rect.left - 200, // Ajustar para que aparezca a la izquierda del botón
      });
    }
  };

  const toggleColumnVisibility = (columnId: string) => {
    setShowColumnVisible((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
    setActiveMenu(null);
  };
  const updateColumnEditable = (columnId: string, newValue: boolean) => {
    setColumnEditable((prev) => ({
      ...prev,
      [columnId]: newValue,
    }));
    setActiveMenu(null);
  };

  return (
    <>
      <div className="flex gap-4 h-full">
        {cols.length > 0
          ? cols.map((column: Column, index) => (
              <ColKanbanMode
                key={index}
                column={column}
                toggleMenu={toggleColumnMenu}
                isColumnEditable={columnEditable[column.id]}
                setColumnEditable={(value) =>
                  updateColumnEditable(column.id, value)
                }
              />
            ))
          : "empty"}
      </div>
      {activeMenu && (
        <article
          ref={menuRef}
          className="fixed group z-10 bg-mantle border border-btn-border rounded-2xl shadow-base shadow-2xl w-64 overflow-hidden menu-dropdown hover:border-font-light"
          style={{
            top: `${activeMenu.top}px`,
            left: `${activeMenu.left}px`,
          }}
        >
          <button
            onClick={() => updateColumnEditable(activeMenu.columnId, true)}
            className="w-full p-2 pl-8 hover:bg-base transition-colors flex items-center justify-between"
          >
            <span className="font-light">Editar Nombre</span>
          </button>
          <button className="w-full p-2 pl-8 hover:bg-base transition-colors flex items-center justify-between">
            <span className="font-light">Mover a</span>
            <FaIcon name="chevron-right" size="size-4" light />
          </button>
          <button
            onClick={() => toggleColumnVisibility(activeMenu.columnId)}
            className={`w-full p-2 hover:bg-base transition-colors flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <FaIcon
                name="check"
                size="size-4"
                transparent={showColumnVisible[activeMenu.columnId]}
              />
              <span className="font-light">Mostrar Columna</span>
            </div>
            <span className="text-sm text-font-light">⌘↑H</span>
          </button>

          <hr className="border-t border-btn-border group-hover:border-font-light" />

          <button className="w-full p-2 pl-8 hover:bg-base transition-colors text-left flex items-center justify-between group">
            <span className="font-light">Borrar Contenido</span>
            <span className="text-sm text-font-light">⌘Supr</span>
          </button>

          <button
            className="w-full p-2 pl-8 hover:bg-base transition-colors text-left flex items-center justify-between group"
            disabled
          >
            <span className="font-medium text-font-light">Borrar Columna</span>
            <span className="text-xs text-font-light">⌘↑Supr</span>
          </button>
        </article>
      )}
    </>
  );
};

export default KanbanMode;
