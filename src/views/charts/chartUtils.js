export const LINE_COLOURS = ["#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6" , "#e6194B", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#42d4f4", "#f032e6" ]
export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export function abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
    number = Number(number)
    forceLetter = forceLetter || false
    if(forceLetter !== false) {
        return annotate(number, maxPlaces, forcePlaces, forceLetter)
    }
    var abbr
    if(number >= 1e12) {
        abbr = 'T'
    }
    else if(number >= 1e9) {
        abbr = 'B'
    }
    else if(number >= 1e6) {
        abbr = 'M'
    }
    else if(number >= 1e3) {
        abbr = 'K'
    }
    else {
        abbr = ''
    }
    return annotate(number, maxPlaces, forcePlaces, abbr)
}
  
  function annotate(number, maxPlaces, forcePlaces, abbr) {
    // set places to false to not round
    var rounded = 0
    switch(abbr) {
      case 'T':
        rounded = number / 1e12
        break
      case 'B':
        rounded = number / 1e9
        break
      case 'M':
        rounded = number / 1e6
        break
      case 'K':
        rounded = number / 1e3
        break
      case '':
        rounded = number
        break
    }
    if(maxPlaces !== false) {
      var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
      if(test.test(('' + rounded))) {
        rounded = rounded.toFixed(maxPlaces)
      }
    }
    if(forcePlaces !== false) {
      rounded = Number(rounded).toFixed(forcePlaces)
    }
    return "$" + rounded + abbr
  }

export  const changePeriod = async (period) => {

    const YEAR_MS = 31536000000
    const MONTH_MS = 2629800000
    let startTime

    switch(period) {
        case "3M":
            startTime = Date.now() - (3 * MONTH_MS);
            break;
        case "6M":
            startTime = Date.now() - (6 * MONTH_MS);
            break;
        case "1Y":
            startTime = Date.now() - (1 * YEAR_MS);
            break;
        case "2Y":
            startTime = Date.now() - (2 * YEAR_MS);
            break;
        case "3Y":
            startTime = Date.now() - (3 * YEAR_MS);
            break;
        case "5Y":
            startTime = Date.now() - (5 * YEAR_MS);
            break;
        case "7Y":
            startTime = Date.now() - (7 * YEAR_MS);
            break;
        case "10Y":
            startTime = Date.now() - (10 * YEAR_MS);
            break;
        case "30Y":
            startTime = Date.now() - (30 * YEAR_MS);
            break;
        case "ALL":
            startTime = 631238400000 // 2nd Jan 1990
            break;
        default:
            startTime = 631238400000 // 2nd Jan 1990
      }
      console.log(`Start Time: ${startTime}`)
    let tempArray = []
    series.forEach((element, index) => {
      const dataArray = element.data
      const filteredArray = dataArray.filter(index => index.time > startTime)

      tempArray[index] = {
        "name" : element.name,
        "data" : filteredArray
      }
    })
    return tempArray
  }

export function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

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

export const formatDate = (timestamp) => {
    let date = new Date(timestamp)
    return `${date.getDate()}/${MONTH_NAMES[date.getMonth()]}/${date.getYear()-100}`
}

export const formatXAxis = (value) => {
  let date = new Date(value)
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  return `${month}/${date.getFullYear()}`;
}

export const changePeriodSimple = (period, series, interval) => {
  
  // interval represents the number of days between each data point. 
  // e.g. weekly data will have an interval of 7

    let tempArray = []

    switch(period) {
        case "30D":
            tempArray = series.slice(series.length - Math.ceil(30/interval), series.length);
            break;
        case "60D":
            tempArray = series.slice(series.length - Math.ceil(60/interval), series.length);
        case "90D":
            tempArray = series.slice(series.length - Math.ceil(90/interval), series.length);
            break;
        case "YTD":
            const day = getDayOfYear()
            tempArray = series.slice(series.length - Math.ceil(day/interval), series.length);
            break;
        case "1Y":
            tempArray = series.slice(series.length - Math.ceil(365/interval), series.length);
            break;
        case "2Y":
            tempArray = series.slice(series.length - Math.ceil(730/interval), series.length);
            break;
        case "3Y":
            tempArray = series.slice(series.length - Math.ceil(1095/interval), series.length);
            break;
        case "5Y":
            tempArray = series.slice(series.length - Math.ceil(1825/interval), series.length);
            break;
        case "7Y":
            tempArray = series.slice(series.length - Math.ceil(2555/interval), series.length);
            break;
        case "10Y":
            tempArray = series.slice(series.length - Math.ceil(3650/interval), series.length);
            break;
        case "30Y":
            tempArray = series.slice(series.length - Math.ceil(10950/interval), series.length);
            break;
        case "ALL":
            tempArray = series
            break;
        default:
            tempArray = series
      }

     return tempArray
  
}