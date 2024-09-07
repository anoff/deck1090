// Fetch aircrafts.json from API and write to DB
const axios = require("axios")
const API_URL = "http://192.168.68.120/tar1090/data/aircraft.json"

const flights = new Map<string, [number, number]>()

class TMessage {
    // see https://github.com/wiedehopf/readsb/blob/dev/README-json.md
    flight: string = ''
    hex: string = ''
    squawk: string = ''
    category: string = ''
    type: string = ''

    lat: number = -1
    lon: number = -1

    alt_geom: number = -1
    geom_rate: number = 0
    gs: number = -1
    mach: number = -1
    track: number = -1
    roll: number = 0
    mag_heading: number = -1
    nav_modes: string = ""
    messages: number = -1
    rssi: number = 0
}
export type Message = TMessage
type OrigMessage = Omit<Message, 'nav_modes'> & { nav_modes: string[] | undefined }

export class CMessage extends TMessage {
    public static fromPartial(m: Partial<OrigMessage>): Message {
        const obj: Message = {
            flight: m.flight ?? "",
            hex: m.hex ?? '',
            squawk: m.squawk ?? '',
            category: m.category ?? '',
            type: m.type ?? '',

            lat: m.lat ?? -1,
            lon: m.lat ?? -1,

            alt_geom: m.alt_geom ?? -1,
            geom_rate: m.geom_rate ?? 0,
            gs: m.gs ?? -1,
            mach: m.mach ?? -1,
            track: m.track ?? -1,
            roll: m.roll ?? 0,
            mag_heading: m.mag_heading ?? -1,
            nav_modes: m.nav_modes?.join(";") ?? "",
            messages: m.messages ?? -1,
            rssi: m.rssi ?? 0
        }
        return obj
        // for (const k of Object.keys(Message)) {
        //     if (m[k] !== undefined) {
        //         obj[k] = m[k]
        //     } else {
        //         if (typeof Message[k] === "number") {
        //             obj[k] = -1
        //         } else if (typeof Message[k] === 'string') {
        //             obj[k] = ''
        //         }
        //     }
        // }
    }
}

async function fetch(): Promise<Message[]> {
    const res = await axios.get(API_URL)
    const data = res.data
    const messages: Message[] = []
    for (const m of data.aircraft as Partial<OrigMessage>[]) {
        if (m.lat !== undefined && m.lon !== undefined) {
            const obj = CMessage.fromPartial(m)
            messages.push(obj)
        }

    }
    return messages
}

function main() {
    setInterval(fetch, 2000)
}

if (require.main === module) {
    main()
}