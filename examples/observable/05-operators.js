const { Observable, interval } = require("rxjs");

const obs = interval(1000);

const fois10 = (obs) => {
  return new Observable((subscriber) => {
    const s = obs.subscribe({
      next: (data) => {
        subscriber.next(data * 10);
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });

    return () => {
      s.unsubscribe();
    };
  });
};

const addPrefixA = (obs) => {
  return new Observable((subscriber) => {
    const s = obs.subscribe({
      next: (data) => {
        subscriber.next("A" + data);
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });

    return () => {
      s.unsubscribe();
    };
  });
};

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
