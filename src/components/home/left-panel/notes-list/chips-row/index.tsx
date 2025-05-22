"use client";

import { Chip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

type ChipsRowProps = {
  chips?: string[];
};

export default function ChipsRow({ chips = [] }: ChipsRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const plusRef = useRef<HTMLSpanElement | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(chips?.length || 0);

  useEffect(() => {
    const container = containerRef.current;
    const plus = plusRef.current;
    if (!container || !plus) return;

    const containerWidth = container.offsetWidth;
    const plusWidth = plus.offsetWidth + 8;

    let totalWidth = 0;
    let count = 0;

    for (let i = 0; i < chips?.length; i++) {
      const chipEl = chipRefs.current[i];
      if (!chipEl) continue;

      const chipWidth = chipEl.offsetWidth + 8;
      if (totalWidth + chipWidth > containerWidth) break;

      totalWidth += chipWidth;
      count++;
    }

    const hidden = chips.length - count;

    if (hidden > 0 && count > 0) {
      const lastChip = chipRefs.current[count - 1];
      const lastChipWidth = lastChip?.offsetWidth ?? 0;

      if (totalWidth - lastChipWidth + plusWidth <= containerWidth) {
        count--;
      }
    }

    setVisibleCount(count);
  }, [chips]);

  const visibleChips = chips.slice(0, visibleCount);
  const hiddenCount = chips.length - visibleCount;

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        overflow: "hidden",
        whiteSpace: "nowrap",
        gap: 8,
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          visibility: "hidden",
          height: 0,
          overflow: "hidden",
        }}
      >
        {chips.map((chip, i) => (
          <div
            key={i}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            style={{ display: "inline-block" }}
          >
            <Chip
              label={chip}
              style={{
                backgroundColor: "var(--tags-highlights)",
                borderRadius: "var(--s)",
              }}
            />
          </div>
        ))}
        <span ref={plusRef} style={{ fontSize: "14px", padding: "4px" }}>
          +{chips.length}
        </span>
      </div>

      {visibleChips.map((chip, i) => (
        <Chip
          key={`visible-${i}`}
          label={chip}
          style={{
            backgroundColor: "var(--tags-highlights)",
            borderRadius: "var(--s)",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        />
      ))}

      {hiddenCount > 0 && (
        <span
          style={{
            flexShrink: 0,
            fontSize: "14px",
            color: "#666",
          }}
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
