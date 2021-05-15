// Global Variables
var decimal = false;
var positive = true;
var solved = true;
var old = '';
var older = '';
var oldest = '';
var answer = '';

function evil(fn) {
  return new Function('return ' + fn)();
}

//Calculator
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: '0',
            formula: ' '
        };
        this.clear = this.clear.bind(this);
        this.solve = this.solve.bind(this);
        this.handleOperation = this.handleOperation.bind(this);
        this.handleDigit = this.handleDigit.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
    }

    clear() {
        this.setState({
            current: '0',
            formula: ''
        });
      positive = true;
      decimal = false;
      solved = true;
    }

    solve() {  
      const { formula, current } = this.state;
      if (!solved){
        old = this.state.formula + this.state.current
        while (!/\d$/.test(old)) {
          old = old.slice(0,-1);
        }
        answer = (Function("return "+old))();
        //let answer = evil(old);
        //answer = Math.round(1000000000000 * answer) / 1000000000000;
        this.setState({
           current: answer,
           formula: old + '='
           });
        decimal = false;
      positive = true;
      solved = true;
    }}

    handleDecimal() {
      solved = false;
        let { formula, current } = this.state;
        if (!decimal) {
            if (!positive) {
                this.setState({
                    current: current + '.',
                });
              decimal = true;
            }
            else if (/\D$/.test(current)) {
                this.setState({
                    formula: formula + current,
                    current: '0.',
                });
              decimal = true;
            } else {
                this.setState({
                    current: current + '.',
                })
              decimal = true;
            }
        }

    }

    handleDigit(e) {
        const value = e.target.value;
        let { current, formula } = this.state;
        if (/=/.test(formula)) {
            this.setState({
                formula: '',
                current: value
            })
        }else if (current==='0') {
            this.setState({
                current: value });
          decimal = false;
          positive = true;
        } else if (value === '0' && current === '/') {
            this.setState({
                current: 'ERROR'
            })
        }  else if (!positive || decimal) {
            this.setState({
                current: current + value
            });
        } else if (/\D$/.test(current)) {
            this.setState({
                formula: formula + current,
                current: value
            });
        } else {
            this.setState({
                current: current + value
            })
        }
    }

    handleOperation(e) {
        const value = e.target.value;
        const { formula, current } = this.state;
        if (solved) {
            this.setState({
                formula: current,
                current: value
            });
        } else if (current === '-' && !positive) {
                this.setState({
                    formula: formula.slice(0, -1),
                    current: value,
                })
          positive = true;
            } else if (/\D$/.test(current) && value === '-') {
                this.setState({
                    formula: formula + current,
                    current: '-',
                })
              positive = false;
              decimal = false
            } else if (!positive) {
              this.setState({
                formula: formula + current,
                current: value,
              });
              postive = true;
              decimal = false;
            } else if (/\D$/.test(current)) {
                this.setState({
                    current: value
                })
              positive = true;
              decimal = false;
            } else {
                this.setState({
                    formula: formula + current,
                    current: value
                })
              decimal = false;
              positive = true;
            }
      solved = false;
            }
        
    

    render() {
        return (
          <div>
            <div className="calculator">
              <div id="screens"><div id="formula">
                <Formula expression={this.state.formula} /></div>
              <div id="output"><Output current={this.state.current} /></div></div>
              <div id="buttons"><Buttons
                decimal={this.handleDecimal}
                solve={this.solve}
                clear={this.clear}
                numbers={this.handleDigit}
                operators={this.handleOperation}
              />
              </div></div>
          </div>
        );
      }
    }
    
    class Buttons extends React.Component {
      render() {
        return (
          <div id="buttongroup">
            <button
              id="seven"
              className="numbtn"
              onClick={this.props.numbers}
              value="7"
            >
              {" "}
              7{" "}
            </button>
            <button
              id="eight"
              className="numbtn"
              onClick={this.props.numbers}
              value="8"
            >
              {" "}
              8{" "}
            </button>
            <button
              id="nine"
              className="numbtn"
              onClick={this.props.numbers}
              value="9"
            >
              {" "}
              9{" "}
            </button>{" "}
            <button
              className="clearbtn"
              id="clearEntry"
              onClick={this.props.clear}
              value="AC"
            >
              {" "}
              CE{" "}
            </button>
            <button
              className="clearbtn"
              id="clear"
              onClick={this.props.clear}
              value="AC"
            >
              {" "}
              AC{" "}
            </button>
            <button
              id="four"
              className="numbtn"
              onClick={this.props.numbers}
              value="4"
            >
              {" "}
              4{" "}
            </button>
            <button
              id="five"
              className="numbtn"
              onClick={this.props.numbers}
              value="5"
            >
              {" "}
              5{" "}
            </button>
            <button
              id="six"
              className="numbtn"
              onClick={this.props.numbers}
              value="6"
            >
              {" "}
              6{" "}
            </button>
            <button
              id="multiply"
              className="opbtn"
              onClick={this.props.operators}
              value="*"
            >
              {" "}
              x{" "}
            </button>
            <button
              id="divide"
              className="opbtn"
              onClick={this.props.operators}
              value="/"
            >
              {" "}
              /{" "}
            </button>
            <button
              id="one"
              className="numbtn"
              onClick={this.props.numbers}
              value="1"
            >
              {" "}
              1{" "}
            </button>
            <button
              id="two"
              className="numbtn"
              onClick={this.props.numbers}
              value="2"
            >
              {" "}
              2
            </button>
            <button
              id="three"
              className="numbtn"
              onClick={this.props.numbers}
              value="3"
            >
              {" "}
              3
            </button>
            <button
              id="add"
              className="opbtn"
              onClick={this.props.operators}
              value="+"
            >
              {" "}
              +{" "}
            </button>
            <button
              id="subtract"
              className="opbtn"
              onClick={this.props.operators}
              value="-"
            >
              {" "}
              −{" "}
            </button>
            <button
              className="numbtn"
              id="zero"
              onClick={this.props.numbers}
              value="0"
            >
              {" "}
              0{" "}
            </button>
            <button
              id="decimal"
              className="numbtn"
              onClick={this.props.decimal}
              value="."
            >
              {" "}
              .{" "}
            </button>
            <button id="equals" onClick={this.props.solve} value="=">
              {" "}
              ={" "}
            </button>
          </div>
        );
      }
    }
    
    class Output extends React.Component {
      render() {
        return (
          <div className="outputScreen" id="display">
            {this.props.current}
          </div>
        );
      }
    }
    
    class Formula extends React.Component {
      render() {
        return <div className="formulaScreen">{this.props.expression}</div>;
      }
    }
    
    ReactDOM.render(<Calculator />, document.getElementById("calculator"));