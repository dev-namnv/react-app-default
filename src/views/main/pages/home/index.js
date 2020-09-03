import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import $ from 'jquery'
import BookApi from '../../../../api/book'

const Home = () => {
    const {cate_id} = useParams()
    const [books, setBooks] = useState([])
    useEffect(() => {
        const getBooks = async () => {
            return await BookApi.all()
        }
        getBooks().then(({data}) => setBooks(data)).catch(() => $('.spinner-border').show())
    }, [cate_id])

    return (
        <div>
            <section className="jumbotron text-center">
                <div className="container">
                    <h1 className="jumbotron-heading">Books</h1>
                    <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                    <p>
                        <Link to="#" className="btn btn-primary my-2 mr-2">Main call to action</Link>
                        <Link to="#" className="btn btn-secondary my-2">Secondary action</Link>
                    </p>
                </div>
            </section>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {books.map(({id, name, feature_image}, key) => (
                            <div className="col-md-4" key={key}>
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top" alt="Thumbnail [100%x225]" style={{height: '225px', width: '100%', display: 'block'}} src={feature_image} data-holder-rendered="true" />
                                    <div className="card-body">
                                        <p className="card-text">{name}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`book/${id}/chapters`} className="btn btn-sm btn-outline-secondary">View</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {

}

export default Home
