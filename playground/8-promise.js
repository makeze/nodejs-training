const doWorkPromise = new Promise((resolve, reject) => {
   setTimeout(() => {
       //resolve(['umba', 'loomba']);
       reject('The grass was greener');
   }, 2000);
});

doWorkPromise.then((result) => {
    console.log('Success: ', result);
}).catch((error) => {
    console.log('Error', error);
});