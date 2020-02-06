/* Copyright @2020, vucsgrad - All rights reserved */
"use strict";

let longFunc = (timeout, name, cb) => {
    setTimeout(() => {
            console.log('Task: ' + name);
            if (cb) cb(undefined);
        } // end handler
        ,
        timeout);
};

let taskA = function(cb) { longFunc(2000, 'A', cb); };
let taskB = function(cb) { longFunc(1000, 'B', cb); };
let taskC = function(cb) { longFunc(500,  'C', cb); };
let taskD = function(cb) { longFunc(1000, 'D', cb); };

let taskW = function(item, cb) {
    let timeout = Math.random() * (1000 - 200) + 20;
    setTimeout(() => {
        console.log('Done with ' + item);
        cb(undefined);
    }, timeout);
};

let taskError = function(cb) {
    setTimeout(() => {
        cb('A bad thing happened');
    }, 750);
};

let taskArray = [taskA, taskB, taskC, taskD];
let errArray = [taskA, taskB, taskError, taskC, taskD];

/****************************************************************/

/* 1) Execute tasks in parallel.  Call the callback once after only the first task finishes
Expected output -->
    // C
    // Done with pickFirst
    // B
    // D
    // A
 */

const pickFirst = (funcArray, cb) => {
    /*** Add your code here ***/
    var hasFirstTaskExecuted = false;
    
    // callback
    const check = () => {
        if (!hasFirstTaskExecuted) {
            hasFirstTaskExecuted = true;
            cb();
        }
    };
    
    funcArray.forEach(task => task(check));
};
pickFirst(taskArray, () => {
    console.log('Done with pickFirst');
});


/* 2) Execute tasks in parallel.  Once all functions have finished, execute callback
Expected output -->
    // C
    // B
    // D
    // A
    // And now on to the next task
 */
const waitForMe = (funcArray, cb) => {
    /*** Add your code here ***/
    var arrLength = funcArray.length;
    // callback
    const doneCheck = () => { if (--arrLength === 0) cb() };

    funcArray.forEach(task => task(doneCheck));
};
waitForMe(taskArray, () => {
    console.log('And now on to the next task');
});


/* 3) Execute function taskW against all elements in an array in parallel, call Function B when done
Expected output -->
    // 1 through 10 in random order and time
    // And now on to the next task
 */
const overAndOver = (dataArray, func, cb) => {
    /*** Add your code here ***/
    var arrLength = dataArray.length;
    // callback
    const doneCheck = () => {
        if (--arrLength === 0) cb();
    };
    dataArray.forEach(ele => {
        func(ele, doneCheck);
    });
};
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
overAndOver(array, taskW, () => {
     console.log('And now on to the next task');
});


/* 4) Execute array of tasks in parallel.  Proceed to fourth task (taskD) only if functions A, B and C are all
    successful, otherwise call an error function
Expected output -->
    // C
    // Error: A bad thing happened
    // B
    // D
    // A
 */
const onlyWithCaution = (funcArray, cb, errFunc) => {
    /*** Add your code here ***/
    //Tried but failed. Maybe I just don't get what is being asked to do here.
};
onlyWithCaution(errArray, () => {
    console.log("Never going to get here");
}, err => {
    console.log(`Error: ${err}`);
});


/* 5) Sequentially execute each task in an array, but go to error handler if there is an error
Expected output -->
    // A
    // B
    // Error: A bad thing happened
 */
const waterfall = (funcArray, cb) => {
    /*** Add your code here ***/
};
waterfall(taskArray, err => {
    console.log(`Error: ${err}`);
});
