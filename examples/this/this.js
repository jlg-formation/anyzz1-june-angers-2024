"use strict";

function toto() {
  console.log("toto this: ", this);
}

toto();

const a = {
  titi: toto,
  qq: 123,
};

a.titi();

new toto();

const obj = Object.create(toto.prototype);
toto.bind(obj)();

toto.bind(1234)();
toto.call(3456);
toto.apply(5678, []);
