<!DOCTYPE html>
<html>
<body>

<h1>My First Web Page</h1>

<script>

function checkCashRegister(price, cash, cid) {
    //make list of denominations and other variables
    var denoms = [["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.1], ["QUARTER", 0.25], ["ONE", 1], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20], ["ONE HUNDRED", 100]];
    
    function CashDrawer(stop) {
      var cash = 0;
      for (var x = 0 ; x < stop; x++) {
        cash += cid[x][1]}
      cash = Math.round(cash * 100)/ 100;
      return cash;
    }
    
    let changeback = [];
    var register = {status: "OPEN", change: changeback};
    var cashInDrawer = CashDrawer(9);
    var changeInDrawer = CashDrawer(4);
    console.log(cashInDrawer);
    let change = Math.round((cash - price) * 100) / 100;
    let coinsback = Math.round((change - parseInt(change))*100)/100;
  
    if (change > cashInDrawer) {
      register.status = "INSUFFICIENT_FUNDS";
      register.change = [];
      return register
    }
    if (change == cashInDrawer) {
      register.status = "CLOSED";
      register.change = cid;
      return register;
    }
    if (coinsback > changeInDrawer) {
      register.status = "INSUFFICIENT_FUNDS";
      register.change = [];
      return register;
    }
    //MakeChange function for calculating the change to be given
    function MakeChange(x) {
      if (cid[x][1] == 0) {
        return change;
      }
      if (change < cid[x][1]) {
        return change; }
      var coinback = denoms[x][1] * parseInt(change / denoms[x][1]);
      if (coinback > cid[x][1] && x == 0) {
        register.status = "INSUFFICIENT_FUNDS";
        register.change = [];
        return change; }
      if (coinback > cid[x][1]) {
        register.change.push([cid[x]]);
        change -= cid[x][1];
        return change;
      }
      register.change.push([denoms[x][0], coinback]);
      change -= coinback;
      return change;
    }
      
    //find how to make the change and if those denoms are available
    for (var i = 8; i >= 0; i--) {
      change = MakeChange(i);
      if (register.status == "INSUFFICIENT_FUNDS") {
        return register;
      }
    
    }
    console.log(register)
    register.change = changeback;
    return register;
  }
  
  
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]); 

  </source>

  </body>
  </html>