import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Flex,
  Item,
  StatusLight,
  Tabs,
  TabList,
  TabPanels,
  Text,
  TextField,
} from '@adobe/react-spectrum';

import TextContainer from './TextContainer';
import { SocketContext } from './SocketContext';

const OptionsMenu = () => {
  const socket = useContext(SocketContext);

  const [connectionStatus, setConnectionStatus] = useState(false);
  const [helperData, setHelperData] = useState('');
  const [uxpData, setUXPData] = useState('');

  useEffect(() => {
    socket.on('uxp-connected', (isUXPConnected) => {
      setConnectionStatus(isUXPConnected);
    });

    socket.on('uxp-message', (receivedMessage) => {
      setUXPData(receivedMessage);
    });
  }, []);

  const sendHelperData = () => {
    socket.emit('helper-message', helperData);
  };

  let connectionStatusLight = (
    <StatusLight variant="negative">Disconnected</StatusLight>
  );

  if (connectionStatus) {
    connectionStatusLight = (
      <StatusLight variant="positive">Connected</StatusLight>
    );
  }

  return (
    <Flex width="size-6000" height="size-8000">
      <Tabs aria-label="UXP Helper Options">
        <TabList>
          <Item key="status">UXP Status</Item>
          <Item key="data">Send data to UXP</Item>
          <Item key="log">Received data from UXP</Item>
        </TabList>
        <TabPanels marginX={4} marginY={16}>
          <Item key="status">
            <TextContainer>{connectionStatusLight}</TextContainer>
          </Item>
          <Item key="data">
            <TextField
              aria-label="Send data to UXP"
              placeholder="Enter data to be sent"
              onChange={(s) => setHelperData(s)}
            ></TextField>
            <Button variant="cta" marginX={16} onPress={() => sendHelperData()}>
              Send
            </Button>
          </Item>
          <Item key="log">
            <TextContainer>
              <Text>
                {uxpData === ''
                  ? 'Messages from UXP will appear here'
                  : uxpData}
              </Text>
            </TextContainer>
          </Item>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default OptionsMenu;
