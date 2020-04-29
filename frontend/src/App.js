import React from 'react';
import LightboxGallery from './components/LightboxGallery';
import axios from 'axios';
import {uuidv4} from "./utils/uuid-generator";

let lastScrollY = 0;
// const logserver_url = 'http://167.172.39.249:5000/';
const logserver_url = 'http://127.0.0.1:5000/';
// const app_backend_url = 'http://127.0.0.1:8000/';
const app_backend_url = 'http://167.172.39.249:8000/';

class App extends React.Component {
  state = {
    images: [],
    user_id: uuidv4(false)
  };

  handleScroll = () => {
    let data = {
        user_id: this.state.user_id,
        object_type: 'image',
        action_type: 'scroll',
        value: window.scrollY - lastScrollY,
        timestamp: + new Date()
    };

    axios.post(logserver_url + 'log/',
              data)
         .then(res => {
            // console.log('Scroll log have been sent');
         });

    lastScrollY = window.scrollY;
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);

    axios.get(app_backend_url + 'api/images/')
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
      <LightboxGallery images={this.state.images} user_id={this.state.user_id}/>
    </div>
  );
  }
}

export default App;
export {logserver_url, app_backend_url}
