import test from "ava";
import { StandaloneServiceProvider } from "@kronos-integration/service";
import initialize from "../src/initialize.mjs";

let port = 3149;

test.before(async t => {
  port++;

  const config = {
    http: {
      logLevel: "error",
      listen: { socket: port }
    }
  };

  t.context.sp = new StandaloneServiceProvider(config);

  initialize(t.context.sp);
  await t.context.sp.start();

  t.context.port = port;
});

//test.after(async t => t.context.sp.stop());

test("startup", async t => {
  t.true(t.context.sp.state === "running" || t.context.sp.state === "starting");
});
