import React from "react";
import "./SearchListItem.css";
import {Button, CollectionItem} from "react-materialize";


const SearchListItem = props =>
<CollectionItem
  // header={props.header}
  onSelect={props.onSelect}
  >
  {props.dataResults.map(
    (data, i) => {
      return <div key={i}>
        <p>{data.name} <span className="search-date">{data.date}</span></p>
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


      // return <Button
      //   className="new-game-select"
      //   key={i}
      //   data-id={data.id}
      //   onClick={() => {
      //     props.saveGame(data.id);
      //   }}
      //   >
      //     <p>{data.name}  <span className="search-date">{data.date}</span></p>
      // </Button>
    })
  }
</CollectionItem>

export default SearchListItem;