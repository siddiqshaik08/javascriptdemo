const employee={
    first:'sid',
    last:'shaik',
    idno:2145,
    desig:'developer',
    dept:'production',
    empdetails: function (){
        console.log(`hello all iam ${this.first} ${this.last} and my idno is ${this.idno}designation is ${this.desig} from ${this.dept}`);           
    },
};


/*
function Employee(first,last,id,designation,department)
{
       this.firstname=first;
       this.lastname=last;
       this.number=id;
       this.desig=designation;
       this.dept=department;
       this.empdetails=function()
       {
           console.log(`hello all iam ${this.firstname} ${this.lastname} and my idno is ${this.number} designation is ${this.desig} from ${this.dept}`);
       };
}
const sid=new Employee('siddiq','shaik',2145,'developer','production');
sid.empdetails();


const robert=new Employee('robert','ronny',2148,'analyst','security');
robert.empdetails();

const ronnie=new Employee('ronnie','awes',2147,'front-end','webi');
ronnie.empdetails();

const arun=new Employee('arun','kumar',2138,'data','terbi5');
arun.empdetails();*/


 /* 

   Create a object for Employee with properties firstname,lastname, idno,designation,

    department. Create a function inside it with the empdetails property which will 

    display all the data of the employee. Use text formation to make meaningfull statement

    of the data.

    Use constructor to instantiate 4 employees details.

   */