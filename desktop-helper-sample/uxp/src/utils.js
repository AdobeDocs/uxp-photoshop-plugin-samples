export const updateConnectionStatus = (isConnected) => {
  let connectionStatus = document.getElementById('connectionStatus');
  connectionStatus.innerText = isConnected ? 'Connected' : 'Disconnected'; 
};