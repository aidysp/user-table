import { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { usersStore } from "@/stores/UsersStore";
import styles from "./ColumnFilter.module.css";

const ColumnFilter = observer(({ field }: { field: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(usersStore.columnFilters[field] ?? '');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = !!usersStore.columnFilters[field];

  return (
    <div className={styles.wrapper} ref={ref}>
       <button
        className={`${styles.icon} ${isActive ? styles.active : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.popover} onClick={(e) => e.stopPropagation()}>
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Значение..."
          />
          <div className={styles.actions}>
            <button
              onClick={() => {
                usersStore.setColumnFilter(field, draft);
                setIsOpen(false);
              }}
            >
              Применить
            </button>
            <button
              onClick={() => {
                setDraft('');
                usersStore.clearColumnFilter(field);
                setIsOpen(false);
              }}
            >
              Сбросить
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export { ColumnFilter };
