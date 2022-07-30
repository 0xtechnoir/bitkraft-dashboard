export const formatTokenName = (name) => {
    switch(name) {
      case "yield_guild_games":
        return "YGG"
      case "alethea_artificial_liquid_intelligence_token":
        return "ALI"
      case "immutable_x":
        return "IMX"
      case "rainbow_token_2":
        return "RBW"
      case "superfarm":
        return "SUPER"
      case "matic_network":
        return "MATIC"
      case "sipher":
        return "SIPHER"
      case "blackpool_token":
        return "BPT"
      default: 
        return "-"
    }
}

export function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  