declare module 'react-loader-spinner' {
  import React from 'react';

  export interface AudioProps {
    color?: string;
    height?: number;
    width?: number;
    radius?: number;
    ariaLabel?: string;
    wrapperStyle?: React.CSSProperties;
    wrapperClass?: string;
  }

  export const Audio: React.FC<AudioProps>;

  export default Audio;
}
