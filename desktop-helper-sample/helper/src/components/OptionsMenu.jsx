import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Flex,
  Item,
  Tabs,
  TabList,
  TabPanels,
  TextField,
  View,
} from '@adobe/react-spectrum';

import { SocketContext } from './SocketContext';

const OptionsMenu = () => {
  const socket = useContext(SocketContext);

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [uxpMessage, setUXPMessage] = useState('');
  const [helperMessage, setHelperMessage] = useState('');

  useEffect(() => {
    socket.on('uxp-connected', (isUXPConnected) => {
      setConnectionStatus(isUXPConnected);
    });

    socket.on('redirect-message', (receivedMessage) => {
      setUXPMessage(receivedMessage);
    });
  }, []);

  const sendHelperMessage = () => {
    socket.emit('helper-message', helperMessage);
  };

  return (
    <Flex width="size-6000" height="size-8000">
      <Tabs aria-label="UXP Helper Options">
        <TabList>
          <Item key="status">UXP Status</Item>
          <Item key="message">Send Message</Item>
          <Item key="data">Data from UXP</Item>
        </TabList>
        <TabPanels marginX={4} marginY={16}>
          <Item key="status">
            {connectionStatus === false ? 'Disconnected' : 'Connected'}
          </Item>
          <Item key="message">
            <Flex alignItems="center">
              <TextField
                aria-label="Send Message"
                placeholder="Send a message to UXP"
                onChange={(s) => setHelperMessage(s)}
              ></TextField>
              <Button
                variant="cta"
                marginX={16}
                onPress={() => sendHelperMessage()}
              >
                Send
              </Button>
            </Flex>
          </Item>
          <Item key="data">
            <View
              borderWidth="thin"
              borderColor="dark"
              borderRadius="medium"
              backgroundColor="dark"
              padding="size-100"
            >
              {uxpMessage === '' ? 'Data From UXP' : uxpMessage}
            </View>
          </Item>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default OptionsMenu;
