import React, { useEffect, useState } from 'react'
import axios, { imageBaseUrl } from "../../services/axios"
import "./tilesrow.css"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function TilesRow({ title, requestUrl, topRow }) {
    const [movies, setMovies] = useState([]);
    const APIKEY="47de2b9e8b2462b53975d18185ac40bf";
    const [urlId, setUrlId] = useState('');
    const [isVideoVisible, setIsVideoVisible] = useState(false);
    const [allMovies,setAllMovies]=useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function getMovies() {
            const response = await axios.get(requestUrl);
            const {data}=response;
            setMovies(data.results);
         
        };
        getMovies();
    }, [requestUrl]);


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
        <div className='row-container'>
            <h2 className='row-title'>{title}</h2>
            <div className='tiles-row-container' onClick={handleShow}>
            {
          movies?.map(movie => (
            <img style={{cursor:"pointer"}} key={movie.id} className={`image-tile ${topRow && "image-tile-top-row"}`} src={`${imageBaseUrl}${topRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`} alt={movie.name} onClick={() => handleMovie(movie.id)}/>
        ))
        
        }
        
            </div>
           
<Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{color:'red'}}
        aria-labelledby="contained-modal-title-vcenter"
      centered
      
      >
        <Modal.Header style={{background:'black'}}>
          <Modal.Title style={{color:'white'}}>Now on <span style={{color:'red'}}>Netflix</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-black'>
        {
            isVideoVisible && urlId && <iframe align="center" width="100%" height="300" src={`https://www.youtube.com/embed/${urlId.key}?autoplay=1&enablejsapi=1`} allow="autoplay" title='ak' className='ytvideo'></iframe>
            }
        </Modal.Body>
        <Modal.Footer style={{background:'black'}}>
          <Button variant="" style={{background:'white',color:'red',fontWeight:'bold'}} onClick={handleClose}>
            Close
          </Button>
          </Modal.Footer>
      </Modal>
             
            
        </div>
    )
}
