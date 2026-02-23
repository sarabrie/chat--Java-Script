function drawCables() {
  const server = document.getElementById('server');
  const serverRect = server.getBoundingClientRect();
  const serverX = serverRect.left + serverRect.width / 2; 
  const serverY = serverRect.top;

  const cablesContainer = document.getElementById('cables');
  cablesContainer.innerHTML = '';

  const clients = [
    document.getElementById('client1'),
    document.getElementById('client2'),
    document.getElementById('client3')
  ];

  clients.forEach((client, index) => {
    const clientRect = client.getBoundingClientRect();
    const clientCenterX = clientRect.left + clientRect.width / 2;
    const clientBottomY = clientRect.bottom;

    const cable = document.createElement('div');
    cable.classList.add('cable');
    cable.id = `cable${index + 1}`;
    cable.style.left = clientCenterX + 'px';
    cable.style.top = clientBottomY + 'px';
    cable.style.height = (serverY - clientBottomY) + 'px';
    cablesContainer.appendChild(cable);
  });
}

function getColorByClientId(clientId) {
  switch (clientId) {
      case 1: return "linear-gradient(135deg, #d1e7ff, #a3d0f9)";
      case 2: return "linear-gradient(135deg, #ffe6cc, #ffb84d)";
      case 3: return "linear-gradient(135deg, #e6ffe6, #b3f2b3)";
  }
}




window.addEventListener('load', drawCables);
window.addEventListener('resize', drawCables);