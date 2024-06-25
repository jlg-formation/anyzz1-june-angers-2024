const { interval, map, tap } = require("rxjs");

const obs = interval(1000);

const fois10 = map((x) => x * 10);
const addPrefixA = map((x) => "A" + x);

const s = obs
  .pipe(
    fois10,
    fois10,
    addPrefixA,
    tap((data) => {
      console.log("data: ", data);
    })
  )
  .subscribe();
setTimeout(() => {
  s.unsubscribe();
}, 5500);
