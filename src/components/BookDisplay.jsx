import React from 'react'

const BookDisplay = (props) => {

    let ratings = props.rating;
    let value = 0;
    let rating;
    ratings.forEach(rating => {
        value += rating;
    })
    rating = Math.round(value/ratings.length);
    return (
        <div key={props._id} style={{ display: props.ye}} className='flex flex-row items-center justify-between border border-solid border-slate-700 my-3 mx-auto rounded w-11/12 shadow-md hover:shadow-slate-400 relative'>
            <div className='flex flex-row items-center'>
                <img src={`https://lib-backend-i000.onrender.com/uploads/${props.image}`} alt={props.title} className='w-20 h-24 mr-2' />
                <div>
                    <h2 className='font-bold text-blue-800 capitalize'>{props.title}</h2>
                    <p><span className='font-bold'>Author:</span> {props.author}</p>
                    <p><span className='font-bold'>Category:</span> {props.category}</p>
                    {props.instock === 0 && <p className='absolute right-2'>Out of stock</p>}
                    <p className='flex flex-row'>
                        Rating: {
                        rating === 1 ? <p>⭐</p> :
                            rating === 2 ? <p>⭐⭐</p> :
                                rating === 3 ? <p>⭐⭐⭐</p> :
                                    rating === 4 ? <p>⭐⭐⭐⭐</p> :
                                        rating === 5 ? <p>⭐⭐⭐⭐⭐</p> : null
                        }
                    </p>
                </div>
            </div>
            {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' id={props.id} onClick={(e) => alert(this.id)}>Borrow</button> */}
        </div>
    )
}

export default BookDisplay