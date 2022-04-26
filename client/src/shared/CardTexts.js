import React from "react";

export function CardTexts(props) {
  return (
    <div>
      <strong>{props.label}</strong>
      <p>{props.value}</p>
    </div>
  );
}
