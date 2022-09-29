import React, { useState,createContext } from 'react';
import {AiOutlinePlus,AiFillDelete,AiOutlineArrowUp,AiOutlineArrowDown} from "react-icons/ai";
import './App.css';
import ReactSwitch from "react-switch";
const ThemeContext = createContext({});

const App:React.FC= () =>{
  
  const [value,setValue] = useState<string>("");
  const [items,setItems] = useState<string[]>([]);
  const [theme,setTheme] = useState<string>("light");

  const deleteItem = (id:number) => {
    setItems((items)=>{
      return items.filter((items,index)=>{
        return index !== id;
      });
    });
  }

  const handleChange = (event :React.ChangeEvent<HTMLInputElement>)=>{
    let newValue = event.currentTarget.value;
    setValue(newValue);
  }
  const handleClick = ()=>{
    setItems((items)=>{
      return[...items,value]
    })
  }
  const move = (firstIndex:number,secondIndex:number) => {
    let newItems:any[] = [...items];
    let temp:any = newItems[firstIndex];
    newItems[firstIndex] = newItems[secondIndex];
    newItems[secondIndex] = temp;
    setItems([...newItems]);
  }

  const toggleTheme = () =>{
    setTheme((curr)=>(curr === "light" ? "dark" :"light"))
  }

  return (
    
      <div className='App' id ={theme}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <h1>TODO App</h1>
            <div className="switch">
                <label>{theme === "light" ? "Light Mode" :"Dark Mode"}</label>
                <ReactSwitch onChange={toggleTheme} height ={20} width={40}checked={theme === "dark"}/>
            </div>
            <div className='title' placeholder='Enter Item'><p>Items</p>
              <button onClick={handleClick}><AiOutlinePlus/></button>
            </div>
            
            <div>{items.map((item,index)=>(
              <div key = {index} className='items'>
                <p contentEditable='true'>{item ? item:"Enter Item"}</p>
                <div>
                  <button onClick={()=>{
                    deleteItem(index);
                  }}><AiFillDelete /></button>
                  <button onClick={()=>{
                    move(index,(index)-1)
                  }}><AiOutlineArrowUp /></button>
                  <button onClick={()=>{
                    move(index,(index)+1)
                  }}><AiOutlineArrowDown /></button>
                </div>
            </div>
            ))}</div>
        </ThemeContext.Provider>
      </div>
  );
}

export default App;