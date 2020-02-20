import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ScrollToTopOnMount from '../services';
import Modal from './modal';
import '../photogalery.scss';
import './albumPhoto.scss';

export default class AlbumPhoto extends Component {
  constructor(props) {
    super(props);
    let {users, albums, photos, match} = this.props;
    users = users.filter(el=>el.username == match.params.id);
    albums = albums.filter(el=>el.userId == users[0].id);
    albums = albums.filter(el=>el.title == match.params.subId.replace(/_/g, ' '));
    photos = photos.filter(el=>el.albumId == albums[0].id);
    this.state = {
      isModal: false,
      loadImage: false,
      loadModal: false,
      idModalPhotos: null,
      urlModalPhoto: null,
      titleModalPhoto: null,
      allPhotosLength: (photos.length-1),
      countImage: null,
      photos,
      users,
      albums
    }
    this.modal = this.modal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.prevModalImg = this.prevModalImg.bind(this);
    this.nextModalImg = this.nextModalImg.bind(this);
  }
  prevModalImg() {
    let {idModalPhotos, photos, allPhotosLength} = this.state;
    let countModalPhoto = photos.findIndex(el=>el.id == idModalPhotos) - 1;
    let self = this;
    if(countModalPhoto<0) {
      countModalPhoto = allPhotosLength;
    }
    this.setState({
      loadImage: true
    });
    let tmp = new Image();
    tmp.src = photos[countModalPhoto].url;
    tmp.onload = function() {
      self.setState({
        loadImage: false,
        countImage: countModalPhoto,
        idModalPhotos: photos[countModalPhoto].id,
        urlModalPhoto: photos[countModalPhoto].url,
        titleModalPhoto: photos[countModalPhoto].title
      });
    }	
  }
  nextModalImg() {
    let {idModalPhotos, photos, allPhotosLength} = this.state;
    let countModalPhoto = photos.findIndex(el=>el.id == idModalPhotos) + 1;
    let self = this;
    if(countModalPhoto>allPhotosLength) {
      countModalPhoto = 0;
    }
    this.setState({
      loadImage: true
    });
    let tmp = new Image();
    tmp.src = photos[countModalPhoto].url;
    tmp.onload = function() {
      self.setState({
        loadImage: false,
        countImage: countModalPhoto,
        idModalPhotos: photos[countModalPhoto].id,
        urlModalPhoto: photos[countModalPhoto].url,
        titleModalPhoto: photos[countModalPhoto].title
      });
    }
  }
  closeModal() {
    let body = document.getElementsByTagName('body');
    body[0].style.overflow = 'visible';
    this.setState({
      isModal: false,
    });
  }
  modal(e) {
    e.preventDefault();
    let body = document.getElementsByTagName('body');
    let {photos} = this.state;
    let idModalPhotos = e.target.getAttribute('data-id');
    let modalPhoto = photos.filter(el=>el.id == idModalPhotos);
    let countModalPhoto = photos.findIndex(el=>el.id == idModalPhotos);
    let urlModalPhoto = modalPhoto[0].url;
    let titleModalPhoto = modalPhoto[0].title;
    let self = this;
    this.setState({
      loadModal: true,
      isModal: true
    });
    let tmp = new Image();
    tmp.src = urlModalPhoto;
    tmp.onload = function() {
      self.setState({
        loadModal: false,
        idModalPhotos,
        urlModalPhoto,
        titleModalPhoto,
        countImage: countModalPhoto
      });
    }
    body[0].style.overflow = 'hidden';
  }
  render() {
    let {isModal, photos, titleModalPhoto, urlModalPhoto, idModalPhotos, users, albums, countImage, allPhotosLength, loadModal, loadImage} = this.state;
    return (
      <div className="photogalery">
        <ScrollToTopOnMount />
        {isModal?<Modal src = {urlModalPhoto} key={idModalPhotos} title = {titleModalPhoto} closeModal = {this.closeModal} prevModalImg = {this.prevModalImg} nextModalImg = {this.nextModalImg} countImage ={countImage} allPhotosLength = {allPhotosLength} loadModal = {loadModal} loadImage = {loadImage}  />:null}
        <div className="back">
          <Link to={`/photographer/${users[0].username}`} >Back to {users[0].name} albums</Link>
        </div>
        <h1>Album - {albums[0].title}</h1>
        <div className="photo-list">
          {
            photos.length?photos.map(el=><div className='photo-list-item' key={el.id} onClick={this.modal}><img src={el.thumbnailUrl} alt={el.title} data-id={el.id} /></div>):<div className='noItems'>Photographer has no photos yet</div>
          }
        </div>
        <div className="back">
          <Link to={`/photographer/${users[0].username}`} >Back to {users[0].name} albums</Link>
        </div>
      </div>
    )
  }
}
