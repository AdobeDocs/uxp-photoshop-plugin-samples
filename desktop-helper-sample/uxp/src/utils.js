export const updateConnectionStatus = (isConnected) => {
  let connectionStatus = document.getElementById('connectionStatus');
  let connectionStatusLight = document.getElementById('connectionStatusLight');

  connectionStatus.innerText = isConnected ? 'Connected' : 'Disconnected';
  connectionStatusLight.setAttribute(
    'class',
    isConnected ? 'positive' : 'negative'
  );
};
