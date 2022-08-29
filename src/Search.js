import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI"
import Book from "./Book"
import { useState, useEffect } from "react"
const Search = ({books,changeShelf, mapOfIdToBooks}) => {

    const [query,setQuery]=useState("")
    const [searchResults, setSearchResults] = useState([]);
    const [mergedBooks, setMergedBooks] = useState([]);
   

    const handleQuery = (value) => {
        setQuery(value)
    }
    useEffect(()=>{
        let mounted = true
        const handleSearch = async() => {
            const result = await BooksAPI.search(query)
            if (result.error){
                setSearchResults([])
            }
            //console.log(res)
            else{
                if (mounted){
                    setSearchResults(result);
                    console.log(searchResults)
            }}
            
        }
        if(query){
        handleSearch();
        }
        return () => {
            mounted = false;
            setSearchResults([])
        }
    },[query]);
    
    useEffect(() => {
    
      const combined = searchResults.map(book => {
        if (mapOfIdToBooks.has(book.id)) {
          return mapOfIdToBooks.get(book.id);
        } else {
          return book;
        }
      })
      setMergedBooks(combined);
    }, [searchResults])

    return (
        <div className="search-books">
        <div className="search-books-bar">
        <Link to="/">
        <button className="close-search">Close</button>
        </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value = {query}
              onChange = {(event)=>{handleQuery(event.target.value)}}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {mergedBooks.map((b) => (
                              <li key = {b.id}>
                                  <Book book={b} changeShelf={changeShelf}/>
                              </li>

              ))}
          </ol>
        </div>
      </div>
    )
}
export default Search