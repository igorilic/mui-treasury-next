import React, { useState } from "react";
import { Story, Meta, StoryContext } from "@storybook/react/types-6-0";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import InputAdornment from "@material-ui/core/InputAdornment";

import MailOutlined from "@material-ui/icons/MailOutlined";
import {
  createTextfieldStandardStyles,
  useTextfieldStandardStyles,
} from "./TextfieldStandard.styles";
import { FormHelperText } from "@material-ui/core";

function withContainer(Story: any, context: StoryContext) {
  return (
    <Box width={320}>
      <Story {...context} />
    </Box>
  );
}

const baseTheme = createMuiTheme();
const textfieldStandardStyles = createTextfieldStandardStyles(baseTheme);
function withTheme(Story: any, context: StoryContext) {
  return (
    <ThemeProvider
      theme={createMuiTheme({
        components: textfieldStandardStyles,
      })}
    >
      <Story {...context} />
    </ThemeProvider>
  );
}

export default {
  title: "Component/Textfield/Standard",
  component: TextField,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["medium", "small"],
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["standard", "filled", "outlined"],
      },
    },
    margin: {
      control: {
        type: "select",
        options: ["none", "dense", "normal"],
      },
    },
  },
  args: {
    error: false,
    variant: "standard",
    label: "Label",
    disabled: false,
  },
  parameters: {
    layout: "centered",
  },
  decorators: [withTheme, withContainer],
} as Meta;

export const Field: Story<TextFieldProps> = (args) => {
  return <TextField {...args}>Children</TextField>;
};
Field.args = {
  placeholder: "Placeholder",
  fullWidth: true,
  size: "medium",
  helperText: "This is a helper text",
};

export const FieldError: Story<TextFieldProps> = (args) => {
  return <TextField {...args}>Children</TextField>;
};
FieldError.args = {
  error: true,
  placeholder: "Placeholder",
  fullWidth: true,
  size: "medium",
  helperText: "This is a helper text",
};

export const FieldIcon: Story<TextFieldProps> = (args) => {
  return (
    <>
      <TextField
        {...args}
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlined />
            </InputAdornment>
          ),
        }}
      >
        Children
      </TextField>
      <br />
      <TextField
        {...args}
        margin="dense"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MailOutlined />
            </InputAdornment>
          ),
        }}
      >
        Children
      </TextField>
    </>
  );
};
FieldIcon.args = {
  placeholder: "Placeholder",
  fullWidth: true,
  size: "medium",
  helperText: "This is a helper text",
};

export const Select: Story<TextFieldProps> = (args) => {
  const [value, setValue] = useState("");
  return (
    <TextField
      {...args}
      select
      SelectProps={{ displayEmpty: true }}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      <MenuItem value="">
        <em>Select Option</em>
      </MenuItem>
      <MenuItem value={1}>Option 1</MenuItem>
      <MenuItem value={2}>Option 2</MenuItem>
      <MenuItem value={3}>Option 3</MenuItem>
    </TextField>
  );
};
Select.args = {
  fullWidth: true,
  size: "medium",
  helperText: "This is a helper text",
};

export const SelectError: Story<TextFieldProps> = (args) => {
  const [value, setValue] = useState("");
  return (
    <TextField
      {...args}
      select
      SelectProps={{ displayEmpty: true }}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      <MenuItem value="">
        <em>Select Option</em>
      </MenuItem>
      <MenuItem value={1}>Option 1</MenuItem>
      <MenuItem value={2}>Option 2</MenuItem>
      <MenuItem value={3}>Option 3</MenuItem>
    </TextField>
  );
};
SelectError.args = {
  error: true,
  fullWidth: true,
  size: "medium",
  helperText: "This is a helper text",
};

export const SelectIcon: Story<TextFieldProps> = (args) => {
  const [value, setValue] = useState("");
  return (
    <>
      <TextField
        {...args}
        select
        SelectProps={{ displayEmpty: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlined />
            </InputAdornment>
          ),
        }}
        margin="dense"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <MenuItem value="">
          <em>Select Option</em>
        </MenuItem>
        <MenuItem value={1}>Option 1</MenuItem>
        <MenuItem value={2}>Option 2</MenuItem>
        <MenuItem value={3}>Option 3</MenuItem>
      </TextField>
      <br />
      <TextField
        {...args}
        select
        SelectProps={{ displayEmpty: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MailOutlined />
            </InputAdornment>
          ),
        }}
        margin="dense"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <MenuItem value="">
          <em>Select Option</em>
        </MenuItem>
        <MenuItem value={1}>Option 1</MenuItem>
        <MenuItem value={2}>Option 2</MenuItem>
        <MenuItem value={3}>Option 3</MenuItem>
      </TextField>
    </>
  );
};
SelectIcon.args = {
  fullWidth: true,
  size: "medium",
  helperText: "This is a helper text",
};

export const ManuallyCompose: Story<FormControlProps> = (args) => {
  return (
    <FormControl {...args}>
      <InputLabel>Manual Label</InputLabel>
      <Input placeholder="Placeholder" />
      <FormHelperText>Hey! need help</FormHelperText>
    </FormControl>
  );
};
ManuallyCompose.args = {
  error: false,
  size: "medium",
};

function withBaseTheme(Story: any, context: StoryContext) {
  return (
    <ThemeProvider theme={baseTheme}>
      <Story {...context} />
    </ThemeProvider>
  );
}
export const OutsideTheme: Story<TextFieldProps> = (args) => {
  const [value, setValue] = useState("");
  const styles = useTextfieldStandardStyles();
  return (
    <>
      {/* @ts-ignore */}
      <TextField
        {...args}
        classes={styles.FormControl}
        InputLabelProps={{
          // @ts-ignore
          classes: styles.InputLabel,
        }}
        InputProps={{
          classes: styles.Input,
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start" classes={styles.InputAdornment}>
              <MailOutlined />
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{
          classes: styles.FormHelperText,
        }}
        placeholder="placeholder"
        helperText="Only standard variant works with this approach!"
      />
      <br />
      {/* @ts-ignore */}
      <TextField
        {...args}
        classes={styles.FormControl}
        select
        SelectProps={{ displayEmpty: true, classes: styles.Select }}
        InputLabelProps={{
          // @ts-ignore
          classes: styles.InputLabel,
        }}
        InputProps={{
          classes: styles.Input,
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end" classes={styles.InputAdornment}>
              <MailOutlined />
            </InputAdornment>
          ),
        }}
        helperText="Only standard variant works with this approach!"
        FormHelperTextProps={{
          classes: styles.FormHelperText,
        }}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <MenuItem value="">
          <em>Select Option</em>
        </MenuItem>
        <MenuItem value={1}>Option 1</MenuItem>
        <MenuItem value={2}>Option 2</MenuItem>
        <MenuItem value={3}>Option 3</MenuItem>
      </TextField>
    </>
  );
};
OutsideTheme.args = {
  margin: "dense",
};
OutsideTheme.decorators = [withBaseTheme];
