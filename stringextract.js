const station=['MAN675847583748sjt567654;Manchester Piccadilly'];
for(str2 of station){
const stcode=station.slice(0,3);
const semindx=station.findIndex(';');
const str2=str1.length;
const humnreadcode=str1.slice(semindx,str2);
const result=stcode +':'+humnreadcode;
document.getElementById('str').innerHTML=result;

}

/*Extract the three-letter station code and store it in a new variable.

Find the character index number of the semicolon.

Extract the human-readable station name using the semicolon character index number

 as a reference point, and store it in a new variable.

Concatenate the two new variables and a string literal to make the final string.

Change the value of the result variable to the final string, not the station.*/