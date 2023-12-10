import React from "react";

export default function Loading(props) {
  return (
    <div className="loadingMain">
      <div style={{ maxWidth: props.length, minHeight: props.length }}></div>
    </div>
  );
}
