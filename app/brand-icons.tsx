type ArrowDirection = "right" | "left" | "down" | "up-right";

export function ArrowIcon({ direction = "right" }: { direction?: ArrowDirection }) {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    "up-right": -45,
  }[direction];

  return (
    <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g transform={`rotate(${rotation} 12 12)`}>
        <path d="M4.75 12h14.5M13.25 6l6 6-6 6" />
      </g>
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m5 12.5 4.25 4.25L19.5 6.5" />
    </svg>
  );
}
