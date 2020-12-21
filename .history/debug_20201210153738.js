/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals } = require('./src/data');
const data = require('./src/data');


function schedule(dayName) {
  // seu código aqui
  // A função é responsável por disponibilizar as informações de horário para uma
  // consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas
  // o cronograma de um dia específico
  // Observações técnicas
  // Analise o teste unitário para entender os retornos que são esperados para esta função
  // O que será avaliado
  // Sem parâmetros, retorna um cronograma legível para humanos
  // Se um único dia for passado, retorna somente este dia em um formato legível para humanos
  let calendar = data.hours;
  let daysAsked=[];
  if (typeof dayName !== 'string') {
    daysAsked = Object.keys(calendar);
  } else {
    daysAsked[0] = dayName;
  }
  const result = {};
  // let result ="";
  console.table(calendar);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
  // https://stackoverflow.com/questions/54651873/how-to-map-key-value-pairs-of-a-map-in-javascript

  calendar.forEach((day,index) => {
    console.log(day.key);
    console.log(day.value.open);
    if(day.key === dayName){
      if (day.value.open === 0) {
        result[day.key] = `CLOSED` ;
      } else {
        result[day.key] =  `Open from  ${day.value.open}am until  ${day.value.close}pm`;
    }} else {
      if (day.value.open === 0) {
        result[day.key] = `CLOSED` ;
      } else {
        result[day.key] =  `Open from  ${day.value.open}am until  ${day.value.close}pm`;
    }
  }
})
  // const days = Object.entries(calendar).reduce(([k,v]) =>{
  //   if (v.open === 0) { return `CLOSED` };
  //   return `Open from  ${v.open}am until  ${v.close}pm`;
  // })
  // console.table(days);
  // let daysList = Object.keys(calendar);
  // for (const day in calendar){
  //   result  = daysAsked.forEach((date,index) => {
  //     if (day === date){
  //       day = days[index];
  //     }
  //   })
  // }
  console.table(result);
  return days;
  // return result;

  // function logMapElements(value, key, map) {
  //   console.log(`m[${key}] = ${value}`);
  // }

  // new Map([['foo', 3], ['bar', {}], ['baz', undefined]])
  //   .forEach(logMapElements);

  // // expected output: "m[foo] = 3"
  // // expected output: "m[bar] = [object Object]"
  // // expected output: "m[baz] = undefined"
}


module.exports = {
  schedule,
};
