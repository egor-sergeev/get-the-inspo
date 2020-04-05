import React from 'react';
import LightboxGallery from './components/LightboxGallery';
import axios from 'axios';
import {uuidv4} from "./utils/uuid-generator";

let lastScrollY = 0;

class App extends React.Component {
  state = {
    images: []
  };

  handleScroll = () => {
    let data = {
        user_id: uuidv4(), // Generating random UUID for user_id while it's not supported yet:
        object_type_id: 0,
        object_type: 'image',
        object_id: uuidv4(true),
        action_type_id: 3,
        action_type: 'scroll',
        value: window.scrollY - lastScrollY,
        timestamp: + new Date()
    };

    axios.post('http://127.0.0.1:8000/api/log/',
              data)
         .then(res => {
            // console.log('Scroll log have been sent');
         });

    lastScrollY = window.scrollY;
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);

    axios.get('http://127.0.0.1:8000/api/images/')
         .then(res => {
           this.setState({
             images: res.data
           })
         })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

