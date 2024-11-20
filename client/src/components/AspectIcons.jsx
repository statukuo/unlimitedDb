import React from "react";
import styled from "styled-components";

const Styles = {
  Icon: styled.img`
    height: 50px;
  `,
};

export function AspectIcons({ aspects }) {
  return aspects.map((aspect) => {
    return (
      <Styles.Icon
        src={"/Aspects_" + aspect + ".png"}
        alt={aspect}
        key={aspect}
      />
    );
  });
}
