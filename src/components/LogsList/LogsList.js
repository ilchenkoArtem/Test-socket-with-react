import React from "react";
import classes from "./LogsList.module.scss";

import { Empty, List } from "antd";
import LogListItem from "./LogListItem/LogListItem";

const LogsList = ({ dataList }) => (
    <List className={classes.logList}>
        {/* prettier-ignore */
        dataList.length
            ? dataList.map(({ marketId, trades }, index) => <LogListItem key={index} indexParent={index} marketId={marketId} trades={trades} />)
            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </List>
);

export default LogsList;
