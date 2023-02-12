import { extendTheme } from 'native-base';
import colors from './color';
import { fonts, fontConfig } from './font';
import Text from './text';
import Input from './input';
import shadows from './shadows';
import TextArea from './textarea';
import Button from './button';

export default extendTheme({
  colors,
  fonts,
  fontConfig,
  components: { Text, Input, TextArea, Button },
  shadows,
});
