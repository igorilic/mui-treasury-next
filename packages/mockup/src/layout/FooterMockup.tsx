import React from "react";
import Container from "@material-ui/core/Container";
import Box, { BoxProps } from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Stack from "@material-ui/core/Stack";
import { Square, Pill, Circle } from "../shape";
import { randomBetween } from "../utils";

export const LinkGroup = ({
  lineCount = 5,
  sx,
}: {
  lineCount?: number;
  sx?: BoxProps["sx"];
}) => {
  return (
    <>
      <Pill sx={{ height: 12, width: 40 }} />
      <br />
      <Stack spacing={2}>
        {[...Array(lineCount)].map((_, index) => (
          <Square
            key={index}
            sx={{ width: randomBetween(56, 120), height: 16 }}
          />
        ))}
      </Stack>
    </>
  );
};

export const FooterMockup = ({
  disableGutters = false,
  ...props
}: BoxProps & { disableGutters?: boolean }) => {
  return (
    <Box
      {...props}
      sx={{
        borderTop: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)" : "grey.200",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "grey.50",
        ...props.sx,
      }}
    >
      <Container sx={{ py: 5, minHeight: 300 }} disableGutters={disableGutters}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ order: { xs: 2, sm: 1, md: 1 } }}
          >
            <Square sx={{ width: 72, height: 48 }} />
            <br />
            <Pill sx={{ height: 14 }} />
            <br />
          </Grid>
          <Grid item xs={6} md={3} sx={{ order: { xs: 3, md: 2 } }}>
            <LinkGroup />
          </Grid>
          <Grid item xs={6} md={3} sx={{ order: { xs: 4, md: 3 } }}>
            <LinkGroup />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ order: { xs: 1, sm: 2, md: 4 } }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
            >
              <Square sx={{ height: 36, flexBasis: 160, flexShrink: 1 }} />
              <Square sx={{ height: 36, flexBasis: 56, flexShrink: 1 }} />
            </Stack>
            <br />
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
            >
              <Circle />
              <Circle />
              <Circle />
            </Stack>
            <br />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
