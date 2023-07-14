import { ToolBox } from "raylu";
import { HelloTool } from "./src/hello_tool";

var tb = new ToolBox()
tb.setTools([new HelloTool()])

module.exports = { tb };