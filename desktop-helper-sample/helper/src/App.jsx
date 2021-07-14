import { Flex, Heading, Text } from '@adobe/react-spectrum';

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
      <Heading level={2} marginBottom={-2}>
        Welcome to the UXP Helper App
      </Heading>
      <Text marginBottom={8}>
        <i>To start, load the UXP plugin into Photoshop and send a message</i>
      </Text>
      <OptionsMenu />
    </Flex>
  );
};

export default App;
