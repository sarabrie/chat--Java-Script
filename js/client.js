class Client {
    constructor(clientName, newMessage, sendTo, sendBTN, messageScreen, cable, server) {
        this.clientName = clientName;
        this.newMessage = newMessage;
        this.sendTo = sendTo;
        this.sendBTN = sendBTN;
        this.messageScreen = messageScreen;
        this.cable = cable;
        this.server = server;
        this.newCable1 = new Cable(clientName, cable, server);
        this.sendBTN.addEventListener("click", () => this.sending());
    }

    async sending() {
        console.log('sending');
        const message = this.newMessage.value.trim();
        const receiver = this.sendTo.value.trim();
        const myName = this.clientName;
        const senderClient = getClientByName(myName);
        const clientDiv = document.querySelector(`#client${getClientIndexByName(myName)}`);
        const color = colors[myName];

        clientDiv.style.border = `2px solid ${color}`;
        clientDiv.style.boxShadow = `0 0 7px ${color}`;

        if (message && receiver) {
            const receiverClient = getClientByName(receiver);

            if (receiverClient) {
                const myPackage = new Package(myName, receiver, message);
                await sleep(1000);
                clientDiv.style.border = "1px solid #ddd";
                clientDiv.style.boxShadow = "none";
                if (!senderClient.newCable1.isProcessing) {
                    await this.newCable1.sendPac(myPackage);
                    this.sendTo.value = '';
                    this.newMessage.value = '';
                }
            }
            else {
                alert("\u274C המשתמש שאליו נשלחה ההודעה לא נמצא!");
            }
        } else {
            alert("\u26A0\uFE0F יש למלא את כל השדות!");
        }
    }


    async setMassageByReciever(mpackage, color, profil) {
        const receiverClient = getClientByName(mpackage.receiver);
        const senderClient = getClientByName(mpackage.myname);

        var img = document.createElement("img");
        img.src = profil;
        img.style.width = '30px';
        img.style.height = '30px';
        img.style.borderRadius = '90px';
        img.style.margin = '0 8px';

        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble');
        bubble.classList.add(receiverClient === senderClient ? 'self' : 'other');
        const senderId = getClientIndexByName(senderClient.clientName);
        bubble.classList.add(`from-client${senderId}`);
        bubble.textContent = mpackage.message;



        if (receiverClient === senderClient) {
            bubble.style.background = 'rgb(172, 203, 231)';
        } else {
            bubble.style.background = 'lightgray';
        }

        const messageContainer = document.createElement('div');
        messageContainer.style.display = 'flex';
        messageContainer.style.alignItems = 'center';
        messageContainer.style.marginBottom = '10px';

        if (receiverClient === senderClient) {
            messageContainer.style.justifyContent = 'flex-end';
            messageContainer.appendChild(bubble);
            messageContainer.appendChild(img);

            receiverClient.messageScreen.scrollTo({
                top: receiverClient.messageScreen.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            messageContainer.style.justifyContent = 'flex-start';
            messageContainer.appendChild(img);
            messageContainer.appendChild(bubble);

            receiverClient.messageScreen.scrollTo({
                top: receiverClient.messageScreen.scrollHeight,
                behavior: 'smooth'
            });
        }

        receiverClient.messageScreen.appendChild(messageContainer);


        await new Promise(resolve => setTimeout(resolve, 1));
        receiverClient.messageScreen.scrollTop = receiverClient.messageScreen.scrollHeight;

        const recieverDiv = document.querySelector(`#client${getClientIndexByName(mpackage.receiver)}`);
        recieverDiv.style.border = `2px solid ${color}`;
        recieverDiv.style.boxShadow = `0 0 7px ${color}`;
        await new Promise(resolve => setTimeout(resolve, 500));
        receiverClient.newCable1.isProcessing = false;
        await new Promise(resolve => setTimeout(resolve, 500));
        recieverDiv.style.border = "1px solid #ddd";
        recieverDiv.style.boxShadow = "none";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addPicture() {
    var img = document.createElement("img");
    img.src = "../img/sara.JPG";
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.borderRadius = '90px';
    var src = document.getElementById("container");
    src.appendChild(img);
    return img;
}