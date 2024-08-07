import test from "ava";
import { initialize } from "../src/component-manager";

test("initialize", async t => {
  await initialize();
});
