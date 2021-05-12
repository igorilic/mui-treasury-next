import React, { PropsWithChildren } from "react";
import cx from "clsx";
import { experimentalStyled as styled, Theme } from "@material-ui/core/styles";
import { Palette } from "@mui-treasury/theme-treasury";
import { unstable_composeClasses as composeClasses } from "@material-ui/unstyled";
import { SxProps } from "@material-ui/system";
import useThemeProps from "@material-ui/core/styles/useThemeProps";
import { getStickerUtilityClass, stickerClasses } from "./stickerClasses";

export type StickerClassKey = keyof typeof stickerClasses;
export type StickerClasses = Partial<typeof stickerClasses>;

export type StickerProps = {
  /**
   * className append to the root element
   */
  className?: string;

  /**
   * variant of the square
   * @default 'none'
   */
  variant?: "none" | "solid" | "soft" | "outlined";

  /**
   * If `true`, this element has round shape
   * @default false
   */
  round?: boolean;

  /**
   * If `true`, this element has base padding left & right (for containing text)
   * @default false
   */
  hasText?: boolean;

  /**
   * The color of the element, rely on @mui-treasury/theme-treasury
   */
  palette?: Palette;

  /**
   * Override or extend the styles applied to the component.
   */
  classes?: StickerClasses;

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
};

const overridesResolver = (props: any, styles: Record<string, object>) => {
  const { styleProps } = props;

  return {
    ...styles.root,
    ...styles[styleProps.variant],
    ...(styleProps.hasText && styles.hasText),
    ...(styleProps.round && styles.round),
  };
};

const useUtilityClasses = (styleProps: StickerProps) => {
  const { variant, round, palette, hasText, classes } = styleProps;
  const slots = {
    root: ["root", round && "round", hasText && "hasText", variant, palette],
  };
  return composeClasses(
    slots,
    getStickerUtilityClass,
    classes as Required<StickerProps["classes"]>
  );
};

const StickerRoot = styled(
  "div",
  {},
  {
    name: "JunSticker",
    slot: "Root",
    overridesResolver,
  }
)(
  ({
    theme: { treasury, ...theme },
    styleProps,
  }: {
    theme: Theme;
    styleProps: StickerProps;
  }) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 24,
    minHeight: 24,
    gap: 2,
    verticalAlign: "middle",
    flexShrink: 0,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    ...(styleProps.round && {
      borderRadius: 100,
    }),
    ...(styleProps.hasText && {
      padding: "0 0.5rem",
    }),
    color: treasury.getColor(styleProps.palette, "500"),
    ...(styleProps.variant === "outlined" && {
      "&:before": {
        display: "block",
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: theme.shape.borderRadius,
        boxShadow: `inset 0 0 0 1px`,
        ...(styleProps.round && {
          borderRadius: 100,
        }),
      },
    }),
    ...(styleProps.variant === "solid" && {
      color: "#fff",
      backgroundColor: treasury.getColor(styleProps.palette, "500"),
    }),
    ...(styleProps.variant === "soft" && {
      color: treasury.getColor(styleProps.palette, "500"),
      backgroundColor: treasury.getColor(styleProps.palette ?? "grey", "100"),
    }),
  })
);

interface StickerComponent {
  <P extends { as?: React.ElementType }>(
    props: P extends { as: infer As }
      ? As extends keyof JSX.IntrinsicElements
        ? P & StickerProps & JSX.IntrinsicElements[As]
        : As extends React.ComponentType<infer AsProps>
        ? P & StickerProps & AsProps
        : PropsWithChildren<P & StickerProps>
      : PropsWithChildren<P & StickerProps>
  ): JSX.Element | null;
}

export const Sticker: StickerComponent = React.forwardRef<
  any,
  PropsWithChildren<StickerProps>
>(function Sticker({ children, ...inProps }, ref) {
  const props = useThemeProps<Theme, StickerProps, "JunSticker">({
    props: inProps,
    name: "JunSticker",
  });
  const {
    variant = "none",
    palette,
    round = false,
    hasText = false,
    ...other
  } = props;

  const styleProps = {
    variant,
    round,
    hasText,
    ...props,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <StickerRoot
      ref={ref}
      {...other}
      styleProps={styleProps}
      className={cx(classes.root, props.className)}
    >
      {children}
    </StickerRoot>
  );
});
