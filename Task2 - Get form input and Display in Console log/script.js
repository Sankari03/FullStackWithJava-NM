const submit = document.getElementById("btnsub");

submit.addEventListener('click',()=>{
    event.preventDefault();
    const n = document.getElementById('name').value;
    const e = document.getElementById('email').value;
    const p = document.getElementById('phno').value;
    const c = document.getElementById('count').value;
    const s = document.getElementById('state').value;

console.log(`
Name : ${n},
Email Id : ${e},
Phone Number : ${p},
Country : ${c},
State : ${s},
`);
})