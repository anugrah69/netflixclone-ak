import axios from '../../services/axios';
import React, { useEffect, useState } from 'react'
import requests from '../../services/requests';
import './cover.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cover() {
    const [movie, setMovie] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const APIKEY="47de2b9e8b2462b53975d18185ac40bf";
    const [urlId, setUrlId] = useState('');
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [allMovies,setAllMovies]=useState([]);
    const handleShow = () => setShow(true);
    


    useEffect(() => {
        async function fetchCoverMovie() {
            const response = await axios.get(requests.fetchTrending);
            let ind = Math.floor(Math.random() * response.data.results.length);
            setMovie(response.data.results[ind])
        };

        fetchCoverMovie();
    }, [requests.fetchTrending]);

    const handleMovie = (id) => {
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${APIKEY}&language=en-US`).then((response) => {
          
          if (response.data.results.length !== 0) {
            setUrlId(response.data.results[0]);
            toggleVideoVisibility(); // Show the video
          } else {
            setUrlId('');
            toggleVideoVisibility(); // Hide the video
          }
        }).catch((error) => {
          console.log("An error", error);
        });
      };
    
      const toggleVideoVisibility = () => {
        setIsVideoVisible(!isVideoVisible);
      };

    return (
        <div style={{  zIndex: 1, position:'relative' }}>
           
            <div
                className='cover-main'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center"
                }}
            >
                <div className='cover-contents' onClick={() => handleMovie(movie.id)}>
                    <h1 className='movie-title'>{movie.title || movie.name || movie.original_name}</h1>
                    <h3 className='movie-overview'>{movie.overview?.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview}</h3>

                    <div style={{ paddingTop: 8 }} >
                        <button className='btn-play' onClick={handleShow}><i className="fa fa-play" ></i> Play</button>

                        <button className='btn-more'><i className="fa fa-info-circle" ></i> More Info</button>
                    </div>
                </div>
            </div>
            {/* for faded cover effect */}
            <div className='faded-bottom'></div>

            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{color:'red'}}
      >
        <Modal.Header  style={{background:'black',fontWeight:'bold'}}>
          <Modal.Title style={{color:'white'}}>Get <span style={{color:'red'}}>Netflix </span>Pre<span style={{color:'red'}}>mium</span> To <span style={{color:'red'}}>Watch</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-black'>
        {
            isVideoVisible && urlId && <iframe align="center" width="100%" height="350" src={`https://www.youtube.com/embed/${urlId.key}?autoplay=1&enablejsapi=1`} allow="autoplay" title='ak' ></iframe>
            }
        </Modal.Body>
        <Modal.Footer style={{background:'black'}}>
          <Button variant="secondary" style={{background:'white',color:'red',fontWeight:'bold'}} onClick={handleClose}>
            Close
          </Button>
          </Modal.Footer>
      </Modal>
    
        </div>
    )
}

export default Cover;
