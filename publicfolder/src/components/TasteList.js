import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { string } from 'prop-types';

const SORT_OPTIONS = {

    'TITLE_ASC': { column: 'title', direction: 'asc', title: 'TITLE \u2193' },
    'TITLE_DESC': { column: 'title', direction: 'desc', title: 'TITLE \u2191' },
    'VOTE_ASC': { column: 'vote', direction: 'asc', title: 'VOTE \u2193'},
    'VOTE_DESC': { column: 'vote', direction: 'desc', title: 'VOTE \u2191' },
    'RANK_ASC': { column: 'rank', direction: 'asc', title: 'TASTE \u2193'},
    'RANK_DESC': { column: 'rank', direction: 'desc', title: 'TASTE \u2191' },
    
}
const FILTER_OPTIONS = {

    'ALL': { name: 'ALL', filter: '' },
    'PLAYLIST': { name: 'Playlist', filter: '' },
    'ARTIST': { name: 'Artist', filter: '' },
    'ALBUM': { name: 'Album', filter: '' },
    'SONG': { name: 'Song', filter: '' },

}
function filterTaste(typeChosen, filterBy = 'ALL') {
    if (FILTER_OPTIONS[filterBy].name == 'ALL') {
        return false
    }
    if (typeChosen == FILTER_OPTIONS[filterBy].name) {
        return false
    }
    return true
}

function useSongs(sortBy = 'RANK_DESC') {
    const [songs, setSong] = useState([])

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('menu').orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)            
            .onSnapshot((snapshot) => {
                const newSongs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setSong(newSongs)
            })
        return () => unsubscribe()
    }, [sortBy])

    return songs
}
function rateSong(rate, id, ranking, voting) {
    if (rate) {
        ranking++;
        voting++;
    } else {
        ranking--;
        voting++;
    }
    const res = firebase.firestore().collection('menu').doc(id).update({
        rank: ranking,
        vote: voting,
    });


}


const TastesList = () => {
    const [sortBy, setSortBy] = useState('RANK_DESC')
    const [filterBy, setfilterBy] = useState('ALL')
    const songs = useSongs(sortBy)
    return (
        <div>
            <Container>
            <h2>Taste List</h2>
                <div>
                    <Row>
                        <Col lg={12} sx={ 12}>
                            
                                <ButtonGroup className="tastebuttons" >
                                <Button onClick={e => setfilterBy('ALL')} variant="outline-info">ALL</Button>
                                <Button onClick={e => setfilterBy('ALBUM')} variant="outline-info">ALBUM</Button>
                                <Button onClick={e => setfilterBy('ARTIST')} variant="outline-info">ARTIST</Button>
                                <Button onClick={e => setfilterBy('PLAYLIST')} variant="outline-info">PLAYLIST</Button>
                              
                                    <Dropdown as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown" >
                                    <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                                        SORT: {SORT_OPTIONS[sortBy].title}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onSelect={e => setSortBy('TITLE_ASC')}>TITLE(a-z)</Dropdown.Item>
                                        <Dropdown.Item onSelect={e => setSortBy('TITLE_DESC')}>TITLE(z-a)</Dropdown.Item>

                                        <Dropdown.Item onSelect={e => setSortBy('VOTE_ASC')}>VOTES(low-high)</Dropdown.Item>
                                        <Dropdown.Item onSelect={e => setSortBy('VOTE_DESC')}>VOTES(high-low)</Dropdown.Item>

                                        <Dropdown.Item onSelect={e => setSortBy('RANK_ASC')}>TASTE(low-high)</Dropdown.Item>
                                        <Dropdown.Item onSelect={e => setSortBy('RANK_DESC')}>TASTE(high-low)</Dropdown.Item>

                                    </Dropdown.Menu>
                                    </Dropdown>
                            </ButtonGroup>
                           
                    

                        </Col>
                
                    </Row>
                </div>
                <hr/>
            <ol className='tastelist'>
                    {songs.map((song) =>

                        <li key={song.id} hidden={filterTaste(song.type, filterBy)}>
                            
                            <Row>
                                <Col xs={4} md={4} lg={4}>
                                    <a href={song.link} target="_">
                                        <Image src={ song.src} rounded fluid />
                                    </a>
                                </Col>
                                <Col xs={4} md={3} lg={3}>
                                    {song.title}<br/>
                                    {song.author}
                                </Col>
                               
                            
                                <Col xs={4} md={2} lg={2}>
                                    <Button variant="outline-success" size="lg" onClick={e => rateSong(true, song.id, song.rank, song.vote)} block>I LIKE</Button>
                                    <Button variant="outline-danger" size="lg" onClick={e => rateSong(false, song.id, song.rank, song.vote)} block>I HATE</Button>
                                </Col>
                                
                                

                                <Col xs={12} md={3} lg={3}>
                                    <Row>
                                        <Col xs={6} md={12} lg={12}>
                                            Taste Score: {song.rank}
                                        </Col>
                                        <Col xs={6} md={12} lg={12}>
                                            VOTES: {song.vote}
                                        </Col>
                                        
                                    </Row>
                                    
                                    
                                    
                                    
                                </Col>
                                
                               

            
                            
                            </Row>
                            <hr/>
                    </li>
                   
                        
                )}
            </ol>
            </Container>
        </div>
    )
}
export default TastesList