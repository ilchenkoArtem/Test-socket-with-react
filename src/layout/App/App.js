import React, { useEffect, useState } from "react";
import connect from "../../services/cryptowat";
import classes from "./App.module.scss";

import { getFormatDataForTable } from "../../components/DataTable/DataTable";
import LogsList from "../../components/LogsList/LogsList";
import Loader from "../../components/Loader/Loader";
import DataTable from "../../components/DataTable/DataTable";

function App() {
    const [dataList, setDataList] = useState([]);
    const [visibleDataList, setVisibleDataList] = useState([]);
    const [filterMarket, setFilterMarket] = useState("");

    useEffect(() => {
        connect(data => setDataList(state => [data, ...state]));
    }, []);

    useEffect(() => {
        if (filterMarket.trim()) {
            const filteredData = dataList.filter(data => data.marketId === filterMarket);
            return setVisibleDataList(filteredData);
        }

        setVisibleDataList(dataList);
    }, [filterMarket, dataList]);

    return (
        <div className="App">
            {dataList.length ? (
                <div className={classes.appContainer}>
                    <DataTable dataList={getFormatDataForTable(visibleDataList)} setFilterMarket={setFilterMarket} />
                    <LogsList dataList={visibleDataList} />
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}

export default App;
