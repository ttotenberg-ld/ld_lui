import { ToolBox } from "raylu";
import { HelloTool } from "./src/hello_tool";
import { CreateBooleanFlag } from "./src/flag_tool";

var tb = new ToolBox()
tb.setTools([new HelloTool(), new CreateBooleanFlag()])

module.exports = { tb };