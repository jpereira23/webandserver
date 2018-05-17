export class Auditor{
  firstName: string;
  lastName: string;
  arrayOfMonths: Array<string>;
  arrayOfDates: Array<any>;

  constructor(aFirstName: string, aLastName: string){
    console.log(aFirstName + " " + aLastName);
    this.firstName = aFirstName;
    this.lastName = aLastName;
    this.arrayOfMonths = [];
    this.arrayOfDates = [];
  }

  addDate(aDate: Date){
    if(this.checkIfMonthEntered(aDate) == false){
      switch(aDate.getMonth()){
	case 0:
	  this.arrayOfMonths.push("January");
	  break;
	case 1:
	  this.arrayOfMonths.push("February");
	  break;
	case 2:
	  this.arrayOfMonths.push("March");
	  break;
	case 3:
	  this.arrayOfMonths.push("April");
	  break;
	case 4:
	  this.arrayOfMonths.push("May");
	  break;
	case 5:
	  this.arrayOfMonths.push("June");
	  break;
	case 6:
	  this.arrayOfMonths.push("July");
	  break;
	case 7:
	  this.arrayOfMonths.push("August");
	  break;
	case 8:
	  this.arrayOfMonths.push("September");
	  break;
	case 9:
	  this.arrayOfMonths.push("October");
	  break;
	case 10:
	  this.arrayOfMonths.push("November");
	  break;
	case 11:
	  this.arrayOfMonths.push("December");
	  break;
      }
    }
  }

  checkIfMonthEntered(aDate: Date){
    for(var i = 0; i < this.arrayOfMonths.length; i++)
    {
      switch(aDate.getMonth()){
      case 0:
	if(this.arrayOfMonths[i] == "January")
	{
	  return true;
	}
	break;
      case 1:
	if(this.arrayOfMonths[i] == "February")
	{
	  return true;
	}
	break;
      case 2:
	if(this.arrayOfMonths[i] == "March")
	{
	  return true;
	}
	break;
      case 3:
	if(this.arrayOfMonths[i] == "April")
	{
	  return true;
	}
	break;
      case 4:
	if(this.arrayOfMonths[i] == "May")
	{
	  return true;
	}
	break;
      case 5:
	if(this.arrayOfMonths[i] == "June")
	{
	  return true;
	}
	break;
      case 6:
	if(this.arrayOfMonths[i] == "July")
	{
	  return true;
	}
	break;
      case 7:
	if(this.arrayOfMonths[i] == "August")
	{
	  return true;
	}
	break;
      case 8:
	if(this.arrayOfMonths[i] == "September")
	{
	  return true;
	}
	break;
      case 9:
	if(this.arrayOfMonths[i] == "October")
	{
	  return true;
	}
	break;
      case 10:
	if(this.arrayOfMonths[i] == "November")
	{
	  return true;
	}
	break;
      case 11:
	if(this.arrayOfMonths[i] == "December")
	{
	  return true;
	}
	break;

      }
    }
    return false;
  }
}
