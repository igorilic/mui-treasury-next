import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import FilledInput from "@material-ui/core/FilledInput";
import {
  NumberSpinner,
  NumberSpinnerProps,
} from "@mui-treasury/component-number-spinner";

export default {
  title: "Component/NumberSpinner",
  component: NumberSpinner,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium"],
      },
    },
  },
  args: {
    size: "medium",
    readOnly: true,
  },
  parameters: {
    layout: "centered",
  },
} as Meta;

export const Outlined: Story<NumberSpinnerProps> = (args) => {
  return <NumberSpinner {...args} />;
};

export const Filled: Story<NumberSpinnerProps> = (args) => {
  return (
    <NumberSpinner
      {...args}
      inputElement={<FilledInput disableUnderline hiddenLabel />}
    />
  );
};
