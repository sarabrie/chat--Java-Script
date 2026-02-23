const server = new Server();
const colors = {
    Tiferet: '#0184ff',
    Sara: '#ff9900',
    Miriam: '#00c500'
};

const pictures = {
    Tiferet: '../img/tiferet.png',
    Sara: '../img/sara.png',
    Miriam: '../img/MIRIAM.png'
}
const clients = [
    new Client("Tiferet",
        document.getElementById("newMessage1"),
        document.getElementById("sendTo1"),
        document.getElementById("sendBTN1"),
        document.getElementById("messageScreen1"),
        document.getElementById("cable1"),
        server),

    new Client("Sara",
        document.getElementById("newMessage2"),
        document.getElementById("sendTo2"),
        document.getElementById("sendBTN2"),
        document.getElementById("messageScreen2"),
        document.getElementById("cable2"),
        server),

    new Client("Miriam",
        document.getElementById("newMessage3"),
        document.getElementById("sendTo3"),
        document.getElementById("sendBTN3"),
        document.getElementById("messageScreen3"),
        document.getElementById("cable3"),
        server)
];

function getClientByName(name) {
    return clients.find(client => client.clientName.toLowerCase() === name.toLowerCase());
}

function getClientIndexByName(name) {
    const lower = name.toLowerCase();
    if (lower === 'tiferet') return 1;
    if (lower === 'sara') return 2;
    if (lower === 'miriam') return 3;
    return 0;
}
console.log("main.js loaded");