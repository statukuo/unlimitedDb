import React from "react";
import styled from "styled-components";

const Styles = {
  LoadingContent: styled.div`
    display: flex;
    justify-content: center;
  `,
};

export function Loading({ children, loadCondition }) {
  if (loadCondition) {
    return (
      <Styles.LoadingContent>
        <img src="/loading.gif" />
      </Styles.LoadingContent>
    );
  }

  return children;
}
