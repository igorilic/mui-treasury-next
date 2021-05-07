import React from "react";
import cx from "clsx";
import {
  experimentalStyled as styled,
  unstable_useThemeProps as useThemeProps,
} from "@material-ui/core/styles";
import { unstable_composeClasses as composeClasses } from "@material-ui/unstyled";
import { getFormAddonUtilityClass } from "./formAddonClasses";
const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;
  const slots = {
    root: ["root"],
  };
  return composeClasses(slots, getFormAddonUtilityClass, classes);
};
const FormAddonRoot = styled(
  "div",
  {},
  {
    name: "JunFormAddon",
    slot: "Root",
    overridesResolver: (props, styles) => styles.root,
  }
)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  minHeight: 24,
  padding: "0 0.5rem",
  fontSize: "0.875rem",
  color: theme.palette.grey[500],
  border: "1px solid",
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.grey[300],
  backgroundColor: theme.palette.grey[100],
}));
export const FormAddon = React.forwardRef(function FormAddon(
  { children, ...inProps },
  ref
) {
  const props = useThemeProps({
    props: inProps,
    name: "JunFormAddon",
  });
  const { ...other } = props;
  const styleProps = {
    ...props,
  };
  const classes = useUtilityClasses(styleProps);
  return (
    <FormAddonRoot
      ref={ref}
      {...other}
      styleProps={styleProps}
      className={cx(classes.root, props.className)}
    >
      {children}
    </FormAddonRoot>
  );
});
