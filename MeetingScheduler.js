function toMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

function toTime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function findMeetingSlot(schedules) {
    const startOfDay = toMinutes("09:00");
    const endOfDay = toMinutes("17:00");

    let busy = [];
    for (let person of schedules) {
        for (let slot of person) {
            busy.push([toMinutes(slot[0]), toMinutes(slot[1])]);
        }
    }
    console.log(busy);

    busy.sort((a, b) => a[0] - b[0]);

    const merged = [];
    for (let [start, end] of busy) {
        if (merged.length === 0 || start > merged[merged.length - 1][1]) {
            merged.push([start, end]);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
        }
    }

    let prevEnd = startOfDay;
    for (let [start, end] of merged) {
        if (start - prevEnd >= 60) {
            return `${toTime(prevEnd)}-${toTime(prevEnd + 60)}`;
        }
        prevEnd = Math.max(prevEnd, end);
    }

    if (endOfDay - prevEnd >= 60) {
        return `${toTime(prevEnd)}-${toTime(prevEnd + 60)}`;
    }

    return "NO AVAILABLE SLOT";
}

const input = [
    [["09:00","10:30"],["12:00","13:00"],["16:00","17:00"]],
    [["09:00","09:30"],["12:30","14:30"]],
    [["11:30","12:30"],["14:30","15:00"],["16:00","17:00"]]
];

console.log(findMeetingSlot(input));
