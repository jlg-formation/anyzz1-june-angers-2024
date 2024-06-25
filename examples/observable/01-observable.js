const { Observable } = require("rxjs");

const obs = new Observable((subscriber) => {
  console.log("je demarre");
  subscriber.next(123);
  subscriber.next("coucou");
  const timer = setTimeout(() => {
    subscriber.next(false);
    subscriber.complete();
    console.log("je finis");
  }, 1000);

  return () => {
    console.log("fin de vie");
    clearTimeout(timer);
  };
});

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

const s = obs.subscribe(observer);
setTimeout(() => {
  s.unsubscribe();
}, 500);
