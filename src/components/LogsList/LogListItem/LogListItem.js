import React from "react";

import { List } from "antd";
import LazyLoad from "react-lazy-load";

const LogListItem = ({ marketId, trades, indexParent }) => (
    <>
        {trades.map(({ timestamp, priceStr, amountStr }, index) =>
            // prettier-ignore
            <LazyLoad key={(indexParent + 1) * (index + 1)}>
                <List.Item >
                    BTC/USD trade on market <b>{marketId}</b>: {new Date(new Date().setTime(timestamp * 1000)).toString()} <b>{priceStr}</b> USD <b>{amountStr}</b> btc
                </List.Item>
            </LazyLoad>
        )}
    </>
);

export default LogListItem;
