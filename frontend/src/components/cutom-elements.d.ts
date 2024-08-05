import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-metronome": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: string;
        speed?: string;
        color?: string;
      };
    }
  }
}
