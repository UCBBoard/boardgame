import React from "react";
import "./SearchLisItem.css";


const SearchListItem = props =>

<CollapsibleItem header={props.header}>
  {props.dataResults.map(
    (data, i) => {
      console.log("mapping array");
      console.log(data);
      // debugger;
      return <Button
              className="new-game-select"
              key={i}
              data-id={data.id}
              onClick={this.newGameSubmit1}>
          <p>{data.name}  <span classname="search-date">{data.date}</span></p>
      </Button>
    })
  }
</CollapsibleItem>

export default SearchListItem;