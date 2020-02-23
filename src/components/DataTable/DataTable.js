import React from "react";

import { Table, Input, Button, Icon } from "antd";

export const getFormatDataForTable = dataList => {
    const data = [];

    if (dataList.length) {
        let xCounter = 0;

        while (data.length < 10 && xCounter !== dataList.length) {
            const { marketId, trades } = dataList[xCounter];

            for (let yCounter = 0;trades.length > yCounter; yCounter++) {
                if (data.length < 10) {

                    const { priceStr, amountStr , timestamp} = trades[yCounter];
                    data.push({
                        key: Number(timestamp) / (xCounter + 1) * (yCounter + 1),
                        marketId,
                        priceStr,
                        amountStr
                    });
                } else {
                    break;
                }
            }
            xCounter++;
        }
    }

    return data;
};

const DataTable = ({ dataList, setFilterMarket }) => {
    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setFilterMarket(selectedKeys);
    };

    const handleResetFilter = clearFilters => {
        clearFilters();
        setFilterMarket("");
    };

    const columns = [
        {
            title: "Market",
            dataIndex: "marketId",
            filterDropdown: ({ confirm, selectedKeys, setSelectedKeys, clearFilters }) => {
                return (
                    <div style={{ padding: 8 }}>
                        <Input
                            placeholder={`Search Market`}
                            value={selectedKeys}
                            onChange={e => setSelectedKeys(e.target.value)}
                            onPressEnter={() => handleSearch(selectedKeys, confirm)}
                            style={{ width: 188, marginBottom: 8, display: "block" }}
                        />

                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm)}
                            icon="search"
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleResetFilter(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </div>
                );
            },
            filterIcon: dataFilter => (
                <Icon type="search" style={{ color: dataFilter.length ? "#1890ff" : undefined }} />
            )
        },
        {
            title: "Price USD",
            dataIndex: "priceStr"
        },
        {
            title: "Amount BTC",
            dataIndex: "amountStr"
        }
    ];

    return <Table columns={columns} dataSource={dataList} pagination={false} size="small" />;
};

export default DataTable;
