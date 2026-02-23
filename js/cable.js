class Cable {
    constructor(clientName, cableElement, server) {
        this.clientName = clientName;
        this.cableElement = cableElement;
        this.isAvailable = true;
        this.server=server;
        this.queue = [];
        this.color = colors[clientName];
        this.package=null;
    }

    async sendPac(myPackage) {
        this.queue.push({ package: myPackage, type: 'sent' }); 
        this.processQueue();
    }

    async receivePac(myPackage) {
        this.queue.push({ package: myPackage, type: 'received' }); 
        this.processQueue();
    }

    async processQueue() {
        if (!this.isAvailable) return;

        this.isAvailable = false;

        while (this.queue.length > 0) {
            const { package: myPackage, type } = this.queue.shift();
            if (type === 'sent') {
                await this.sendPacToServer(myPackage);
            } else if (type === 'received') {
                await this.sendPacToClient(myPackage); 
            }
        }

        this.isAvailable = true;
    }

    async sendPacToServer(myPackage) {
        this.package=myPackage;
        const cableDiv = document.querySelector(`#cable${getClientIndexByName(myPackage.myname)}`);
        cableDiv.style.border = `2px solid ${this.color}`;
        cableDiv.style.boxShadow = `0 0 7px ${this.color}`;
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        cableDiv.style.border = "none";
        cableDiv.style.boxShadow = "none";
        this.server.setServer(myPackage);
    }

    async sendPacToClient(myPackage) {
        this.package=myPackage;
        console.log(`Cable (${this.clientName}): sending package to client`, myPackage);
        const senderColor = colors[myPackage.myname];
        const senderProfil = pictures[myPackage.myname];
        const cableDiv = document.querySelector(`#cable${getClientIndexByName(myPackage.receiver)}`);
        cableDiv.style.border = `2px solid ${senderColor}`;
        cableDiv.style.boxShadow = `0 0 7px ${senderColor}`;

        await new Promise(resolve => setTimeout(resolve, 1000));
        cableDiv.style.border = "none";
        cableDiv.style.boxShadow = "none";

        const receiverClient = getClientByName(myPackage.receiver);
        // receiverClient.setMassageByReciever(myPackage, senderColor);
        receiverClient.setMassageByReciever(myPackage, senderColor, senderProfil);
    }
}