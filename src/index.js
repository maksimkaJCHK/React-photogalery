import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import AuthorList from './components/main';
import UserAlbums from './components/photographer';
import AlbumPhoto from './components/album';
import {LoadedBlock} from './components/services';
import 'jspolyfill-array.prototype.findIndex';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './components/photogalery.scss';

const node = document.getElementById('app');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResponse: 0,
      albums: [],
      photos: [],
      users: []
    }
    this.response = this.response.bind(this);
  }

  componentDidMount() {
    this.response('photos');
    this.response('albums');
    this.response('users');
  }
  response(puth) {
    superagent.get(`https://jsonplaceholder.typicode.com/${puth}`)
    .send()
    .set('accept', 'json')
    .end((err, res) => {
      if(err==null) {
        let resp = JSON.parse(res.text);
        this.setState({
          isResponse: ++this.state.isResponse,
          [puth]: [...resp]
        });
      }
    });
  }
  render() {
    let {users, photos, albums, isResponse} = this.state;

    return (
      <Router>
        <Route path="/" exact = {true} render = {() => (
          (isResponse>2)?<AuthorList users = {users} />:<LoadedBlock title = 'List of photographers...' />
        )} />
        <Route path="/photographer/:id" exact = {true} render = {({match})=> (
          // Я думаю, что адрес должен содержать имя пользователя, альбомы с фотографиями сформирую в UserAlbums
          (isResponse>2)?<UserAlbums photos = {photos} users = {users} albums = {albums} match = {match} />:<LoadedBlock title = 'Photographer albums loaded...' />
        )} />
        <Route path="/photographer/:id/:subId" exact = {true} render = {({match})=> (
          (isResponse>2)?<AlbumPhoto photos = {photos} users = {users} albums = {albums} match = {match} />:<LoadedBlock title = 'Album photos loaded...' />
        )} />
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  node
)
