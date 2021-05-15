marked.setOptions({
    breaks:true
  });
  
  const starterString = `#This is where you type your Markdown
  
  Make *headings* with #, paragraphs with linebreaks.
  ##Can be Headings too\n>A Quote can be set off
  and code can be _unformatted_ with \`the use of backticks\`
  If you have a block of code \`\`\`triple backticks
  will do the trick\`\`\`
  For more info see [this Github reference](https:%2F%2fguides.github.com/features/mastering-markdown/)
  There are also unordered and ordered lists.
  1. Marks the itmes in an ordered list.
  2. but a - or a * at start of the list will make bullet points.  
  ![Markdown Logo](https:%2F%2Fupload.wikimedia.org/wikipedia/commons/d/d9/Markdown.png)`;
        
        /*`# Welcome to my React Markdown Previewer!
  
  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)`;*/
  //editor.placeholder=starterString;
  
  //function markup() {
  //  var unmarked=editor.value;
  //  preview.innerHTML=marked(unmarked);
  //};
  
  
  //editor.addEventListener('change', markup);
  //editor.addEventListener('keyup',markup);
  //window.onload = () => {preview.innerHTML=marked(starterString); editor.value=starterString}
  
  class Markdown extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
         editorText: '',
         previewHtml: marked(starterString),
        placeholder: starterString
                 };
      this.handleInput = this.handleInput.bind(this);
    }
    handleInput(event) {
      this.setState({editorText: event.target.value});
      this.setState({previewHtml: marked(event.target.value)});
      }
  
  render() {
    return (
      <div id="markdown" className="row mt-3 mb-2 mr-3 ml-3 form-outline justify-content-center">
        <textarea id="editor" className="col-5 mr-2 form-control" placeholder={this.state.placeholder} value={this.state.editorText} onChange={this.handleInput} />
        <div className="col-5 ml-2 card">
        <div id="preview" className="card-body" dangerouslySetInnerHTML={{__html: this.state.previewHtml}} />
      </div>
        </div>
      );
  }
          };
  
  
  const domContainer = document.getElementById('markdown');
  ReactDOM.render(<Markdown />, domContainer);