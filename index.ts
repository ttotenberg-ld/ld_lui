import { ToolBox } from "raylu";
import { CreateBooleanFlag } from "./src/flag_tool";

var tb = new ToolBox()
tb.setTools([new CreateBooleanFlag()])

module.exports = { tb };