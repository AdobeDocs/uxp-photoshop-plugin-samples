import { Flex, Heading } from '@adobe/react-spectrum';

import OptionsMenu from './components/OptionsMenu';

const App = () => {
  return (
    <Flex
      direction="column"
      gap="size-100"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Heading level={2}>Welcome to the UXP Helper App</Heading>
      <OptionsMenu />
    </Flex>
  );
};

export default App;
