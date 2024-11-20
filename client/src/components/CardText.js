import React from "react";
import { useCardList } from "../contexts/CardContext";
import reactStringReplace from 'react-string-replace';
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "../constants";
import ReplyIcon from '@mui/icons-material/Reply';
import { CostIcon } from "./CostIcon";

const Styles = {
    CardText: styled(Typography)`
        display: block;
    `
};

export function CardText({ cardText, variant }) {
    const { possibleFilters } = useCardList();

    let replacedText = cardText;

    const replaceCost = (baseText) => {
        let replacedTextCost = baseText;

        replacedTextCost = reactStringReplace(replacedTextCost, /({*{*Exhaust}*}*)/g, (match, idx) =>
            <Box fontWeight='bold' display='inline' key={match + idx + Math.random()}><ReplyIcon sx={{ transform: "scaleX(-1)" }} /></Box>
        );

        replacedTextCost = reactStringReplace(replacedTextCost, /({*{*C=\d}*}*)/g, (match, idx) => {
            return <Box fontWeight='bold' display='inline' key={match + idx + Math.random()}><CostIcon cost={match.match(/\d/g)} /></Box>;
        }

        );

        return replacedTextCost;
    };

    replacedText = reactStringReplace(replacedText, "\n", (match, idx) =>
        <br key={match + idx} />
    );

    replacedText = reactStringReplace(replacedText, /(When.*:{1})/g, (match, idx) =>
        <Box fontWeight='bold' display='inline' key={match + idx + Math.random()}>{replaceCost(match)}</Box>
    );

    replacedText = reactStringReplace(replacedText, /(On.*:{1})/g, (match, idx) =>
        <Box fontWeight='bold' display='inline' key={match + idx + Math.random()}>{replaceCost(match)}</Box>
    );

    replacedText = reactStringReplace(replacedText, /(Action.*:{1})/g, (match, idx) =>
        <Box fontWeight='bold' display='inline' key={match + idx + Math.random()}>{replaceCost(match)}</Box>
    );

    replacedText = replaceCost(replacedText);

    if (possibleFilters.keywords?.options) {
        possibleFilters.keywords.options.forEach(keyword => {
            replacedText = reactStringReplace(replacedText, keyword, (match, idx) => (
                <Box fontWeight='bold' display='inline' color={COLORS.POWER} key={match + idx + Math.random()}>{keyword}</Box>
            ));
        });
    }

    if (possibleFilters.traits?.options) {
        possibleFilters.traits.options.forEach(trait => {
            replacedText = reactStringReplace(replacedText, trait, (match, idx) =>
                <Box fontWeight='bold' display='inline' key={match + idx + Math.random()}>{trait}</Box>
            );
        });
    }

    return <Styles.CardText variant={variant}>{replacedText}</Styles.CardText>;
}
