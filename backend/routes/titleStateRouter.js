const express = require("express");
const router = express.Router();

import { dbPool } from "../db_connector.js";
import checkReq from "../commentChecker.js";
