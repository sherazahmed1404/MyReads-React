import "./App.css";
import { useState, useEffect } from "react";
import Shelves from "./Shelves";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI"
import {Routes,Route, BrowserRouter} from "react-router-dom";

function App() {
  const [Books,setBooks] = useState([]);
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());
 
  useEffect(() => {
    const fetchData = async() => {
    const res = await BooksAPI.getAll();
    setBooks(res)
    setMapOfIdToBooks(createMapOfBooks(res))
    };
    fetchData();
  
  },[]); 

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const changeShelf = (book, destination) => {
    const updatedValue = Books.map((bk) => {
      if(bk.id === book.id){
        book.shelf = destination;
      return book;
      }
      return bk;
      
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = destination;
      updatedValue.push(book)
    }
    setBooks(updatedValue);
     BooksAPI.update(book,destination);

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element = {
          <Search books = {Books} mapOfIdToBooks = {mapOfIdToBooks} changeShelf = {changeShelf}/>
        }
        />          
      <Route path="/"
        element = {
          <Shelves books={Books} changeShelf={changeShelf}/> 
        }
      />    
      </Routes>
      </BrowserRouter>
  );
}

export default App;
