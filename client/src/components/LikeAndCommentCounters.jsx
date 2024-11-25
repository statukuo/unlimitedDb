import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Styles = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
  `,
  LabelsWithIcon: styled(Typography)`
    margin: 10px;
    display: flex;
    align-items: center;
  `,
};

export function LikeAndCommentCounter({ likes, comments }) {
  return (
    <Styles.Wrapper>
      <Styles.LabelsWithIcon variant="h5">
        <FavoriteIcon />
        {likes}
      </Styles.LabelsWithIcon>
      <Styles.LabelsWithIcon variant="h5">
        <ChatBubbleOutlineIcon />
        {comments}
      </Styles.LabelsWithIcon>
    </Styles.Wrapper>
  );
}
