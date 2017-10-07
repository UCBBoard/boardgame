import React from "react";
import "./SearchListItem.css";
import {Button, CollectionItem, Preloader} from "react-materialize";


const SearchListItem = (props) => {

return (
    <CollectionItem
    onSelect={props.onSelect}
    >
    {props.dataResults.map(
      (data, i) => {
        return <div className="search-wrapper"key={i}>
          <p className="searchP">{data.name} <span className="search-date">{data.date}</span></p>
          <Button
            // className="new-game-select"
            key={i + "-collection"}
            data-id={data.id}
            onClick={() => {
              props.saveGame(data.id, "games")
            }}
          > Add to your collection! </Button>
          <Button
            // className="new-game-select"
            key={i + "-wishlist"}
            data-id={data.id}
            onClick={() => {
              props.saveGame(data.id, "wishlist")
            }}
          > Add to your wishlist! </Button>
        </div>
      })
    }
  </CollectionItem>
)
}



export default SearchListItem;