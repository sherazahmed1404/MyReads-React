import {Link} from "react-router-dom";
import Shelf from "./Shelf"
const Shelves = ({books, changeShelf}) => {

const currentlyReading = books.filter((book) => book.shelf === "currentlyReading")
const wantToRead = books.filter((book) => book.shelf === "wantToRead")
const read = books.filter((book) => book.shelf === "read")

return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        </div>
        <div className="list-books-content">
            <div>
            <Shelf title = "Currently Reading" books = {currentlyReading} changeShelf={changeShelf}/>
            <Shelf title = "Want To Read" books = {wantToRead} changeShelf={changeShelf}/>
            <Shelf title = "Read" books = {read} changeShelf={changeShelf}/>
            </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book
          </Link>
        </div>

    </div>
    

)

}
export default Shelves