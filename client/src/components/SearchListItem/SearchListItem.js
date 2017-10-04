import React from "react";
import "./SearchListItem.css";
import {Button, CollapsibleItem, CollectionItem} from "react-materialize";


const SearchListItem = props =>
<CollectionItem
  header={props.header}
  onSelect={props.onSelect}
  >
  {props.dataResults.map(
    (data, i) => {
      return <Button
        className="new-game-select"
        key={i}
        data-id={data.id}
        onClick={() => {
          props.saveGame(data.id);
        }}
        >
          <p>{data.name}  <span className="search-date">{data.date}</span></p>
      </Button>
    })
  }
</CollectionItem>

export default SearchListItem;