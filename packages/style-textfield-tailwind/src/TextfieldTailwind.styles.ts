import { alpha, Theme } from "@material-ui/core/styles";
import { Components } from "@material-ui/core/styles/components";

type Output = Required<
  Pick<
    Components,
    | "MuiFormLabel"
    | "MuiInputLabel"
    | "MuiInputBase"
    | "MuiInput"
    | "MuiOutlinedInput"
    | "MuiFilledInput"
    | "MuiInputAdornment"
  >
>;

const getPlaceholderVisible = (theme: Theme) => {
  const light = theme.palette.mode === "light";
  return {
    opacity: `${light ? 1 : 0.5} !important`,
  };
};
export const createTextfieldTailwindStyles = (theme: Theme): Output => {
  const placeholderVisible = getPlaceholderVisible(theme);
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[700],
          lineHeight: "1.5rem",
          "& + .MuiOutlinedInput-root": {
            marginTop: 4,
          },
          "& + .MuiFilledInput-root": {
            marginTop: 4,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          transform: "none",
          "& + .MuiFilledInput-root": {
            marginTop: 28,
          },
          "&.Mui-focused:not(.Mui-error)": {
            color: theme.palette.grey[700],
          },
        },
        outlined: {
          transform: "none",
          "& + .MuiOutlinedInput-root": {
            marginTop: 28,
          },
          "&.Mui-focused:not(.Mui-error)": {
            color: theme.palette.grey[700],
          },
        },
        // @ts-ignore
        standard: {
          transform: "none",
          "& + .MuiInput-root": {
            marginTop: 24,
          },
          "&.Mui-focused": {
            color: theme.palette.grey[700],
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          lineHeight: "1.5rem",
          "&&& .MuiInputBase-input": {
            // tripple '&' to override default behaviour
            "&::-webkit-input-placeholder": placeholderVisible,
            "&::-moz-placeholder": placeholderVisible, // Firefox 19+
            "&:-ms-input-placeholder": placeholderVisible, // IE11
            "&::-ms-input-placeholder": placeholderVisible, // Edge
          },
          "&:before": {
            borderBottom: "2px solid",
            borderBottomColor: theme.palette.grey[200],
          },
          "label + &": {
            marginTop: 0,
          },
        },
        input: {
          height: "auto",
          padding: "8px 2px",
          borderBottom: "2px solid rgba(0,0,0,0)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          lineHeight: "1.5rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          "&&& .MuiInputBase-input": {
            // tripple '&' to override default behaviour
            "&::-webkit-input-placeholder": placeholderVisible,
            "&::-moz-placeholder": placeholderVisible, // Firefox 19+
            "&:-ms-input-placeholder": placeholderVisible, // IE11
            "&::-ms-input-placeholder": placeholderVisible, // Edge
          },
          "&:hover:not(.Mui-disabled)": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[300],
            },
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1,
              borderColor: alpha(theme.palette.primary.main, 0.38),
            },
          },
        },
        input: {
          padding: "8px 12px",
          height: "auto",
          border: "1px solid rgba(0,0,0,0)",
        },
        notchedOutline: {
          top: 0,
          borderColor: theme.palette.grey[300],
          "& legend": {
            display: "none",
          },
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          lineHeight: "1.5rem",
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.grey[100],
          "&:hover": {
            backgroundColor: theme.palette.grey[100],
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.grey[200],
            opacity: 0.6,
          },
          "&.Mui-focused": {
            backgroundColor: theme.palette.background.paper,
            boxShadow: `inset 0 0 0 1px ${theme.palette.grey[700]}`,
          },
          "&&& .MuiInputBase-input": {
            // tripple '&' to override default behaviour
            "&::-webkit-input-placeholder": placeholderVisible,
            "&::-moz-placeholder": placeholderVisible, // Firefox 19+
            "&:-ms-input-placeholder": placeholderVisible, // IE11
            "&::-ms-input-placeholder": placeholderVisible, // Edge
          },
          "& .MuiInputAdornment-positionStart": {
            marginTop: "0 !important",
          },
        },
        input: {
          padding: "8px 12px",
          height: "auto",
          border: "1px solid rgba(0,0,0,0)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "::placeholder": {
            color: theme.palette.grey[500],
          },
          "&.Mui-disabled": {
            cursor: "not-allowed",
          },
        },
        inputAdornedEnd: {
          "&&": {
            paddingRight: 2,
          },
        },
        inputAdornedStart: {
          "&&": {
            paddingLeft: 2,
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
        },
      },
    },
  };
};
