import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import CheckboxList from './components/CheckboxList'
class App extends React.Component{
    render() {
        return (
            <div className='container'>
                <Battle />
              {/*<CheckboxList options={['One', 'Two', 'Three']}/> */}  
            </div>
        )
    }
}

ReactDOM.render(
   <App />, 
    document.getElementById('app')
)