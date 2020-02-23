import React from "react";
import classes from "./Loader.module.scss";
import { Spin } from "antd";

const Loader = () => <Spin size="large" className={classes.loader} />;

export default Loader;
