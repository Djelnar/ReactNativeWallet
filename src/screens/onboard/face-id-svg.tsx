import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

interface FaceIDIconProps {
  color: string;
  style: SvgProps['style'];
}
export const FaceIDIcon = ({color, style}: FaceIDIconProps) => (
  <Svg style={style} fill="none" viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M16 8v2M8 8v2M9 16s1 1 3 1 3-1 3-1M12 8v5h-1M7 21H5a2 2 0 0 1-2-2v-2M17 21h2a2 2 0 0 0 2-2v-2"
    />
  </Svg>
);
