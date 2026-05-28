import { Context, Layer } from "effect";
import { db } from ".";

export class DBServices extends Context.Tag("DBService")<DBServices, typeof db>() {
  static Live = Layer.succeed(DBServices,db)
}
