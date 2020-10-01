import React from "react";

export default class ClassboxList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      checked: false
    }
 }
  componentDidUpdate(){
    this.setState({
        checked: true
    })
  }

  render() {
    const { checked } = this.state
    return(
        <ul>
          <React.Fragment>
          <li>
            <input
              type="checkbox"
              value='1'
              checked={checked}
              onChange={()=> this.componentDidUpdate() }
            />
            <label>Test</label>
          </li>
          </React.Fragment>
        </ul>
    )
  }
}
