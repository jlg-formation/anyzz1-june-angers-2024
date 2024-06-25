const { interval, map } = require("rxjs");

const obs = interval(1000);

const fois10 = map((x) => x * 10);
const addPrefixA = map((x) => "A" + x);

const observer = {
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const s = obs.pipe(fois10, fois10, addPrefixA).subscribe(observer);
setTimeout(() => {
  s.unsubscribe();
}, 5500);
