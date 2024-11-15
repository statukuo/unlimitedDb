import React from "react";
import Header from "../components/Header";
import { BasePage } from "./BasePage";

export function AdminBatchUpdate() {
  return (
    <BasePage>
      <div className="AdminBatchUpdate">
        <Header />

        <input name="jsonInput" />
      </div>
    </BasePage>
  );
}
