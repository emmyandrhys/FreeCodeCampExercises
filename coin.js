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

  let register = {status: 'OPEN', change: []};
  let changeback = [["PENNY", 0], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
  var cashInDrawer = CashDrawer(8);
  var changeInDrawer = CashDrawer(4);
  let change = Math.round((cash - price) * 100) / 100;
  var coins = Math.round((change - parseInt(change)) * 100) / 100;

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
  if (coins > changeInDrawer) {
    register.status = "INSUFFICIENT_FUNDS";
    register.change = [];
    return register;
  }
  //MakeChange function for calculating the change to be given
  function MakeChange(i) {
    var drawer = cid[i][1];
    if (change < drawer) {    
      return change; }
  
    var coinback = Math.round( 100 * denoms[i][1] * (change / denoms[i][1])) / 100;
    if (coinback > drawer) {
      changeback[x][1] = cid[i][1];
      change -= drawer;
      return change;
    }
    if (coinback == 0) {
      return change;
    }
   // let giveback = [denoms[i][0], coinback];
    changeback[x][1] = coinback;
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

  for(var x = 0; x < changeback.length; x++) {
    if (changeback[x][1] != 0)
    { register.change.pop(changeback[x])  };
  return register;
}}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])