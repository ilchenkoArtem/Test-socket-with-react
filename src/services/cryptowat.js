import { message } from "antd";

let socket = null;

const defaultSubscribe = {
    subscribe: {
        subscriptions: [
            {
                streamSubscription: {
                    resource: "instruments:9:trades"
                }
            }
        ]
    }
};

const connectToCryptowat = successCallback => {
    socket = new WebSocket("wss://stream.cryptowat.ch/connect?apikey=TMN646H739FC2IJQG938");

    socket.addEventListener("open", () => {
        message.success("Соединение c сервером установленно");
    });

    socket.addEventListener("error", error => {
        message.error("Ошибка " + error.message);
    });

    socket.addEventListener("message", async event => {
        const data = JSON.parse(await event.data.text());

        if (data.authenticationResult && data.authenticationResult.status === "AUTHENTICATED") {
            message.success("Аунтификация прошла успешно");

            socket.send(JSON.stringify(defaultSubscribe));

            return;
        }

        if (data.marketUpdate) {
            const { market, tradesUpdate } = data.marketUpdate;
            successCallback && successCallback({ ...market, ...tradesUpdate });
        }
    });

    socket.onclose = function(event) {
        if (event.wasClean) {
            message.warn("Соединение прервано");
        } else {
            message.error("Обрыв соеденения"); // например, "убит" процесс сервера
        }
        message.error(`Код: ${event.code}. Причина: ${event.reason}`);
    };
};
export default connectToCryptowat;
