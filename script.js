'use strict';

const account1Number = {
  owner: 'Zidan Bonanne',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2Number = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const accountsNumber = [account1Number, account2Number];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Zidan Bonanne',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2022-05-01T07:42:02.383Z',
    '2022-03-20T09:15:04.904Z',
    '2022-03-03T10:17:24.185Z',
    '2022-03-08T14:11:59.604Z',
    '2022-03-04T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2022-05-01T07:42:02.383Z',
    '2022-03-20T09:15:04.904Z',
    '2022-03-03T10:17:24.185Z',
    '2022-03-08T14:11:59.604Z',
    '2022-03-04T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const nowDate = function (acc) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  const dataFormat = new Intl.DateTimeFormat(acc.locale, options).format(now);
  // const locale = navigator.language;
  // console.log(locale);
  return dataFormat;
  // const day = `${now.getDate()}`.padStart(2, 0);
  // const month = `${now.getMonth() + 1}`.padStart(2, 0);
  // const year = now.getFullYear();
  // const hours = `${now.getHours()}`.padStart(2, 0);
  // const minute = `${now.getMinutes()}`.padStart(2, 0);

  // return `${day}/${month}/${year}, ${hours}:${minute}`;
};

const formatCurrency = function (mov, acc) {
  const options = {
    style: 'currency',
    currency: acc.currency,
  };

  const formatNumber = new Intl.NumberFormat(acc.locale, options).format(
    mov.toFixed(2)
  );
  return formatNumber;
};

const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hours = `${date.getHours()}`.padStart(2, 0);
    // const minute = `${date.getMinutes()}`.padStart(2, 0);

    return new Intl.DateTimeFormat(locale).format(date);
  }
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (move, i) {
    const type = move >= 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${formatDate(date, acc.locale)}</div>
    <div class="movements__value">${formatCurrency(move, currentAccount)}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);

    // if (move >= 0) {

    //   console.log(`${index + 1}: Deposit ${move}`);
    // } else {
    //   console.log(`${index + 1}: WithDrawal ${move}`);
    // }
  });
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUserNames(accounts);

const cotacaoeur = 1.1;
const deposit = account1.movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    return mov * cotacaoeur;
  })
  .reduce((acc, mov) => acc + mov, 0);
// console.log(deposit);
// console.log(accounts);

const withdrawalDeposits = account1.movements.filter(move => move < 0);
// console.log(withdrawalDeposits);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, bal) => acc + bal, 0);
  const balance = acc.balance;
  labelBalance.textContent = `${formatCurrency(balance, acc)} `;
};

const calcCreateDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurrency(incomes, acc)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurrency(Math.abs(out), acc)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${formatCurrency(interest, acc)}`;
};
const update = function (acc) {
  // display movements
  displayMovements(acc);

  //display balance

  calcDisplayBalance(acc);
  //display summary
  calcCreateDisplaySummary(acc);
  zeroTime();
};

const starLogOutTime = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearTimeout(timer);
      labelWelcome.textContent = `Log in to get Started`;
      containerApp.style.opacity = 0;
    }

    time--;
  };
  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// event handler
let currentAccount, timer;
// currentAccount = account1;
// update(currentAccount);
// containerApp.style.opacity = 100;

const zeroTime = function () {
  if (timer) clearInterval(timer);
  timer = starLogOutTime();
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // display ui and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    labelDate.textContent = nowDate(currentAccount);
    // console.log(nowDate(currentAccount.locale));
    // clear input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    update(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.userName !== receiverAcc?.userName
  ) {
    console.log('transfer valid');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    update(currentAccount);

    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      find => find.userName === currentAccount.userName
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      update(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// setInterval(function () {
//   let now = new Date();
//   const options = {
//     minute: 'numeric',
//     second: 'numeric',
//   };
//   now = Intl.DateTimeFormat('en-US', options).format();
//   console.log(now);
// }, 1000);
// create a date
// const now = new Date();
// console.log(now);
// console.log(new Date(1999, 9, 23, 11, 55, 30));

// const changeColorMovements = function () {
//   const change1 = [...document.querySelectorAll('.movements__value')];
//   console.log(change1);
//   const change = change1.Map(el => Number(el.textContent.replace('€', '')));
//   console.log(change);
//   change.forEach(function (row, i) {
//     if (row > 0) {
//     }
//   });
// };
// const test = Array.from({ length: 100 }, (_, i) => i * 3);
// console.log(test);
// account1.movements.sort((a, b) => {
//   if (a > b) return 1;

//   if (b > a) return -1;
// });
// account1.movements.sort((a, b) => a - b);
// console.log(account1.movements);

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// console.log(accountMovements.flat().reduce((acc, mov) => acc + mov, 0));
// const overalBalance = accounts
//   .flatMap(mov => mov.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);
// const account = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');

// const logado = function (acc) {
//   acc.pin === 1111 ? console.log('liberado') : console.log('negado');
// };
// // console.log(account);
// logado(account);

// const data = [5, 2, 4, 1, 15, 8, 3];

// const calcAverageHumanAge = function (data) {
//   const average = data.reduce((mov, acc) => acc + mov, 0);
//   // average = average / data.length;
//   console.log(`${average / data.length}`);
// };
// calcAverageHumanAge(data);
// const julia = [3, 5, 2, 12, 7];
// const kate = [10, 5, 6, 8, 3];

// const dogs = function (julia, kate) {
//   const without = julia.splice(1, 2);
//   console.log(without);
//   const together = [...without, ...kate];
//   console.log(together);
//   together.forEach(function (move, index) {
//     if (move >= 3) {
//       console.log(`It is ${index + 1} adult for has ${move} years old`);
//     } else {
//       console.log(`It is ${index + 1} puppy for has ${move} years old`);
//     }
//   });
// };
// dogs(julia, kate);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];
//slice
// console.log(arr.slice(0, 3));
// // console.log(arr.splice());s
// console.log(arr.slice());
// console.log([...arr]);

// //splice

// console.log(arr.splice(1, 2));
// console.log(arr);

// //reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];

// console.log(arr2.reverse());

// //concat

// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //join

// console.log(letters.join(' - '));
// console.log(letters.indexOf('b'));
// console.log(letters.includes('a'));

//at
// const arr = [21, 45, 66];
// console.log(arr.at(0));
// console.log(arr[arr.length - 1]);
// console.log(arr.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const move of movements) {
//   if (move > 0) {
//     console.log(`You deposited ${move} `);
//   } else {
//     console.log(`You withdrew ${Math.abs(move)}`);
//   }
// }

// movements.forEach(function (move, index) {
//   if (move > 0) {
//     console.log(`${index + 1} You deposited ${move} `);
//   } else {
//     console.log(`${index + 1} You withdrew ${Math.abs(move)}`);
//   }
// });

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// // const movementsEur = movements.map(function (mov) {
// //   return Math.trunc(mov * eurToUsd);
// // });

// const movementsEur = movements.map(mov => mov * eurToUsd);
// console.log(movementsEur);
