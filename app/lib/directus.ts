import { authentication, createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("http://baas.isp.cw.co.ke")
  .with(
    authentication("cookie", {
      credentials: "include",
    })
  )
  .with(rest({ credentials: "include" }));

export default directus;
