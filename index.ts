import { ToolBox } from "raylu";
import { CreateBooleanFlag } from "./src/flag_tool";
import { UpdateBooleanPercentageRollout } from "./src/targeting_tool";

var tb = new ToolBox()
tb.setTools([new CreateBooleanFlag(), new UpdateBooleanPercentageRollout()])

module.exports = { tb };