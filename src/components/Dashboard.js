import React, { useState } from 'react';

import {
  initiateGetResult,
  initiateLoadMoreAlbums,
  initiateLoadMorePlaylist,
  initiateLoadMoreArtists
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';
import TasteList from './TasteList';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Dashboard = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('albums');
  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory('albums');
      });
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const loadMore = async (type) => {
    if (isValidSession()) {
      const { dispatch, albums, artists, playlist } = props;
      setIsLoading(true);
      switch (type) {
        case 'albums':
          await dispatch(initiateLoadMoreAlbums(albums.next));
          break;
        case 'artists':
          await dispatch(initiateLoadMoreArtists(artists.next));
          break;
        case 'playlist':
          await dispatch(initiateLoadMorePlaylist(playlist.next));
          break;
        default:
      }
      setIsLoading(false);
    } else {
      history.push({
        pathname: '/',
        state: {
          session_expired: true
        }
      });
    }
  };

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { albums, artists, playlist } = props;
  const result = { albums, artists, playlist };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  return (
    <React.Fragment>
      {isValidSession() ? (
        <div>
                  <Header />
                  <h2>Its time to put your favorite music to the taste test!!</h2>
                  <Button variant="outline-success" size="lg" onClick={handleShow}  block>
                      Add to the list
                  </Button>
                  <TasteList />

      
                  <Modal show={show} onHide={handleClose} size="lg">
                      <Modal.Header closeButton>
                          <Modal.Title>Spotify Search </Modal.Title>

                      </Modal.Header>
                      <Modal.Body>
                          <SearchForm handleSearch={handleSearch} />
                          <Loader show={isLoading}>Loading...</Loader>
                          <SearchResult
                              result={result}
                              loadMore={loadMore}
                              setCategory={setCategory}
                              selectedCategory={selectedCategory}
                              isValidSession={isValidSession}
                          />




                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                              Close
          </Button>
                          
                      </Modal.Footer>
                  </Modal>

          
        </div>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: {
              session_expired: true
            }
          }}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    artists: state.artists,
    playlist: state.playlist
  };
};

export default connect(mapStateToProps)(Dashboard);
