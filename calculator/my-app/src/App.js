import React, { Component } from 'react';
import './App.css';

// VARS:
const isOperator = /[x/+‑]/,
  endsWithOperator = /[x+‑/]$/,
  endsWithNegativeSign = /\d[x/+‑]{1}‑$/

// COMPONENTS:
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      oldValue: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      solved: false
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleSolution = this.handleSolution.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleDigits = this.handleDigits.bind(this);
    this.clearEntry= this.clearEntry.bind(this)
  }

  maxDigitWarning() {
    this.setState({
      currentValue: 'Digit Limit Met',
      oldValue: this.state.currentValue
    });
    setTimeout(() => this.setState({ currentValue: this.state.oldValue }), 1000);
  }

  handleSolution() {
    if (!this.state.currentValue.includes('Limit')) {
      let expression = this.state.formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+0+0+0+0+0+0+');
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentValue: answer.toString(),
        formula:
          expression
            .replace(/\*/g, '⋅')
            .replace(/-/g, '‑')
            .replace('+0+0+0+0+0+0+', '‑-')
            .replace(/(x|\/|\+)‑/, '$1-')
            .replace(/^‑/, '-') +
          '=',
        oldValue: answer,
        solved: true,
        lastClicked: ''
      });
    }
  }

  handleOperators(e) {
    if (!this.state.currentValue.includes('Limit')) {
      const value = e.target.value;
      const { formula, oldValue, solved } = this.state;
      this.setState({ currentValue: value, solved: false, lastClicked:value });
      if (solved) {
        this.setState({ formula: oldValue + value, lastClicked: value });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          oldValue: formula,
          formula: formula + value,
          lastClicked: value
        });
      } else if (!endsWithNegativeSign.test(formula)) {
        this.setState({
          formula:
            (endsWithNegativeSign.test(formula + value) ? formula : oldValue) +
            value,
            lastClicked: value
        });
      } else if (value !== '‑') {
        this.setState({
          formula: oldValue + value,
          lastClicked: value
        });
      }
    }
  }

  handleDigits(e) {
    if (!this.state.currentValue.includes('Limit')) {
      const { currentValue, formula, solved } = this.state;
      const value = e.target.value;
      this.setState({ solved: false });
      if (currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (solved) {
        this.setState({
          currentValue: value,
          formula: value !== '0' ? value : '',
          lastClicked: value
        });
      } else {
        this.setState({
          currentValue:
            currentValue === '0' || isOperator.test(currentValue)
              ? value
              : currentValue + value,
          formula:
            currentValue === '0' && value === '0'
              ? formula === ''
                ? value
                : formula
              : /([^.0-9]0|^0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value,
          lastClicked: value
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.solved === true) {
      this.setState({
        currentValue: '0.',
        formula: '0.',
        solved: false,
        lastClicked: '.'
      });
    } else if (
      !this.state.currentValue.includes('.') &&
      !this.state.currentValue.includes('Limit')
    ) {
      this.setState({ solved: false });
      if (this.state.currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(this.state.formula) ||
        (this.state.currentValue === '0' && this.state.formula === '')
      ) {
        this.setState({
          currentValue: '0.',
          formula: this.state.formula + '0.',
          lastClicked: '.'
        });
      } else {
        this.setState({
          currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.',
          lastClicked: '.'
        });
      }
    }
  }

  clearAll() {
    this.setState({
      currentValue: '0',
      oldValue: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      solved: false
    });
  }
  clearEntry() {
    const last = this.state.lastClicked;
    var form;
    var current;
    var newlast;
    if (isOperator.test(last)) {
      form = this.state.oldValue;
      current = '0';
      newlast = this.state.oldValue[‑1];
    }
    else if (/\d/.test(last) || last==='.') {
      form = this.state.formula.slice(0, ‑2);
      current = this.state.currentValue.slice(0, ‑1);
      newlast = this.state.formula[‑1]
    }
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <FormulaScreen formula={this.state.formula} />
          <SolutionScreen currentValue={this.state.currentValue} />
          <Buttons
            decimal={this.handleDecimal}
            solve={this.handleSolution}
            clearAll={this.clearAll}
            number={this.handleDigits}
            operator={this.handleOperators}
          />
        </div>
      </div>
    );
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div>
        <button id="seven" className="numBtn" onClick={this.props.number} value="7"> 7 </button>
        <button id="eight" className="numBtn" onClick={this.props.number} value="8"> 8 </button>
        <button id="nine" className="numBtn" onClick={this.props.number} value="9"> 9 </button>
        <button className="clearBtn" id="clearE" onClick={this.props.clearEntry} value="CE"> CE </button>
        <button className="clearBtn" id="clearA" onClick={this.props.clearAll} value="AC"> AC </button>
        <button id="four" className="numBtn" onClick={this.props.number} value="4"> 4 </button>
        <button id="five" className="numBtn" onClick={this.props.number} value="5"> 5 </button>
        <button id="six" className="numBtn" onClick={this.props.number} value="6"> 6 </button>
        <button id="multiply" className="opBtn" onClick={this.props.operator} value="*"> * </button>
        <button id="divide" className="opBtn" onClick={this.props.operator} value="/"> / </button>
        <button id="one" className="numBtn" onClick={this.props.number} value="1"> 1 </button>
        <button id="two" className="numBtn" onClick={this.props.number} value="2"> 2 </button>
        <button id="three" className="numBtn" onClick={this.props.number} value="3"> 3 </button>
        <button id="add" className="opBtn" onClick={this.props.operator} value="+"> + </button>
        <button id="subtract" className="opBtn" onClick={this.props.operator} value="‑"> ‑ </button>
        <button id="zero" className="numBtn button" onClick={this.props.number} value="0"> 0 </button>
        <button id="decimal" className="numBtn" onClick={this.props.decimal} value="."> . </button>
        <button id="equals" onClick={this.props.solve} value="="> = </button>
      </div>
    );
  }
}

class SolutionScreen extends React.Component {
  render() {
    return (
      <div className="solutionScreen" id="display">
        {this.props.currentValue}
      </div>
    );
  }
}

class FormulaScreen extends React.Component {
  render() {
    return <div className="formulaScreen">{this.props.formula}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}


export default App;
