import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 });

export const cacheValidator = ({ action, key, data }) => {
  switch (action) {
    case "get":
      return cache.get(key);

    case "set":
      return cache.set(key, data);

    case "delete":
      return cache.del(key);

    default:
      throw new Error(`Invalid cache action: ${action}`);
  }
};
