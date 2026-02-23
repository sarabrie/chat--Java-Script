class Server {
    constructor() {
        this.myPackages = [];
        this.isProcessing = false;
    }

    async setServer(myPackage) {

        this.myPackages.push(myPackage);
        this.processQueue();
    }

    async processQueue() {

        if (this.isProcessing) return;

        this.isProcessing = true;

        while (this.myPackages.length > 0) {
            const packageToProcess = this.myPackages.shift();
            await this.processPackage(packageToProcess);
        }

        this.isProcessing = false;
    }

    async processPackage(myPackage) {
        const color = colors[myPackage.myname];

        const receiverClient = getClientByName(myPackage.receiver);

        const serverDiv = document.getElementById("server");
        serverDiv.style.border = `2px solid ${color}`;
        serverDiv.style.boxShadow = `0 0 7px ${color}`;

        await sleep(1000);
        receiverClient.newCable1.receivePac(myPackage);
        serverDiv.style.border = "2px dashed #ccc";
        serverDiv.style.boxShadow = "none";

    }


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
