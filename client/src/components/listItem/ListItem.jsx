import './listItem.scss'
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false)
  const [movieList, setMovieList] = useState({})

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8800/api/movies/find/' + item,
          {
            headers: {
              token:
                'Bearer ' +
                JSON.parse(localStorage.getItem('user')).accessToken,
            },
          }
        )
        setMovieList(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovie()
  }, [item])
  return (
    <Link to='/watch' state={{ movie: movieList }}>
      <div
        className='listItem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movieList.img} alt='' />
        {isHovered && (
          <>
            <video src={movieList.trailer} autoPlay={true} loop />
            <div className='itemInfo'>
              <div className='icons'>
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUpAltOutlined className='icon' />
                <ThumbDownOutlined className='icon' />
              </div>
              <div className='itemInfoTop'>
                <span>{movieList.duration}</span>
                <span className='limit'>{movieList.limit}</span>
                <span>{movieList.year}</span>
              </div>
              <div className='desc'>{movieList.desc}</div>
              <div className='genre'>{movieList.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}
