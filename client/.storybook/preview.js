import "../styles/globals.css"
import * as nextImage from 'next/image';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});