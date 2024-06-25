const { ReplaySubject } = require("rxjs");

const subject = new ReplaySubject(1);

subject.next("toto");
subject.next("titi");
subject.next("tata");

const observer = (name) => ({
  next: (data) => {
    console.log(`${name} data: `, data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});

const s1 = subject.subscribe(observer("s1"));
const s2 = subject.subscribe(observer("s2"));

subject.next(777);

s2.unsubscribe();

subject.next(123123);

s1.unsubscribe();
