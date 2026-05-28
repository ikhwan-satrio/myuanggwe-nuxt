import { Context, Layer } from "effect";
import { withBackendCache, invalidateUserCache } from ".";

export class RedisService extends Context.Tag("RedisService")<RedisService, {
  withBackendCache: typeof withBackendCache
  invalidateUserCache: typeof invalidateUserCache
}>() {
  static Live = Layer.succeed(RedisService, { withBackendCache, invalidateUserCache })

}
