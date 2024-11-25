import { Fab, Paper, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { AspectIcons } from "./AspectIcons";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LikeAndCommentCounter } from "./LikeAndCommentCounters";

const Styles = {
  Tile: styled(Paper)`
    height: 200px;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  `,
  DeckBackground: styled.img`
    width: 120%;
    position: absolute;
    top: -100px;
  `,
  Icons: styled.div`
    position: relative;
    display: block;
    width: 170px;
    height: 150px;
    background-image: linear-gradient(to right, black, rgba(255, 255, 255, 0));
    padding-left: 10px;
    padding-top: 10px;
    img {
      width: 40px;
      height: 40px;
    }
  `,
  Title: styled(Typography)`
    width: 100%;
    height: 50px;
    position: relative;
    color: white;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    background-image: linear-gradient(to top, black, rgba(255, 255, 255, 0));
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 50px;
    text-align: CENTER;
    padding-left: 10px;
    padding-right: 10px;
  `,
  DeleteIcon: styled(Fab)`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    border-top-left-radius: 0;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 0;
    z-index: 1;
  `,
  Counters: styled.div`
    position: absolute;
    top: 110px;
    color: white;
  `,
};

export function DeckTile({
  likeCount,
  commentCount,
  leader,
  aspects,
  title,
  deckId,
  deleteEnabled,
  handleOpenDeleteDialog,
}) {
  const navigate = useNavigate();

  const onDelete = (event) => {
    event.stopPropagation();
    handleOpenDeleteDialog(title, deckId);
  };

  const renderDeleteIcon = () => {
    if (!deleteEnabled) {
      return;
    }

    return (
      <Styles.DeleteIcon color="error" onClick={onDelete}>
        <DeleteForeverIcon />
      </Styles.DeleteIcon>
    );
  };

  return (
    <Styles.Tile elevantion={24} onClick={() => navigate("/deck/" + deckId)}>
      <Styles.DeckBackground src={leader?.backArt} />
      <Styles.Icons>
        <AspectIcons aspects={aspects}></AspectIcons>
      </Styles.Icons>
      {renderDeleteIcon()}
      <Styles.Counters>
        <LikeAndCommentCounter likes={likeCount} comments={commentCount} />
      </Styles.Counters>
      <Styles.Title variant="h5">{title}</Styles.Title>
    </Styles.Tile>
  );
}
