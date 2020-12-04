import React from 'react';
// import c from './ProfileInfo.module.css';


export class ProfileStatus extends React.Component{

  state = {
    editMode: false,
    status: this.props.status
  }

  // toggleEditMode = () => {
  //   this.setState({
  //     editMode: !this.state.editMode
  //   });
  //   this.props.updateStatus(this.state.status);
  // }

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
    // setTimeout(console.log('Таймер'),3000); //почему задержка нулевая получается?
  }

  onStatusChange = e => {
    this.setState({
      status: e.currentTarget.value
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.status !== this.props.status){
      this.setState({
        status: this.props.status
      })
    }
  }

  render(){
    return (
      <div>
        {!this.state.editMode && //отображается если в стейт false
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.props.status || 'Write your status'}</span>
          </div>
        }
        {this.state.editMode &&
          <div>
            <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
          </div>
        }
      </div>
    );
  }
}

