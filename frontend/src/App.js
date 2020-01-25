import React from 'react';
import LightboxGallery from './components/LightboxGallery';
import axios from 'axios';


class App extends React.Component {
  state = {
    images: []
  };

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/images/')
         .then(res => {
           this.setState({
             images: res.data
           })
         })
  }

  render() {
    return (
    <div>
      <LightboxGallery images={this.state.images}/>
    </div>
  );
  }
}

export default App;

