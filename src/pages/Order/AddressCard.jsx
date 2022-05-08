// import React from "react";
// import { Button } from "react-bootstrap";
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import { useSelector } from "react-redux";
// import { selectAdresses } from "../../store/user/selectors";

// const getItems = () =>
//   Array(20)
//     .fill(0)
//     .map((_, ind) => ({ id: `element-${ind}` }));

// export default function AddressCard() {
//   const addresses = useSelector(selectAdresses);
//   const [items, setItems] = React.useState(getItems);
//   const [selected, setSelected] = React.useState([]);
//   const [position, setPosition] = React.useState(0);
//   function LeftArrow() {
//     const { isFirstItemVisible, scrollPrev } =
//       React.useContext(VisibilityContext);

//     return (
//       <Button
//         style={{ display: isFirstItemVisible ? "none" : "block" }}
//         disabled={isFirstItemVisible}
//         onClick={() => scrollPrev()}
//       >
//         Left
//       </Button>
//     );
//   }

//   function RightArrow() {
//     const { isLastItemVisible, scrollNext } =
//       React.useContext(VisibilityContext);

//     return (
//       <Button
//         style={{ display: isLastItemVisible ? "none" : "block" }}
//         disabled={isLastItemVisible}
//         onClick={() => scrollNext()}
//       >
//         Right
//       </Button>
//     );
//   }

//   function Card({ onClick, selected, title, itemId }) {
//     const visibility = React.useContext(VisibilityContext);

//     return (
//       <div
//         onClick={() => onClick(visibility)}
//         style={{
//           width: "160px",
//         }}
//         tabIndex={0}
//       >
//         <div className="card">
//           <div>{title}</div>
//         </div>
        
//       </div>
//     );
//   }

//   const isItemSelected = (id) => !!selected.find((el) => el === id);

//   const handleClick =
//     (id) =>
//     ({ getItemById, scrollToItem }) => {
//       const itemSelected = isItemSelected(id);

//       setSelected((currentSelected) =>
//         itemSelected
//           ? currentSelected.filter((el) => el !== id)
//           : currentSelected.concat(id)
//       );
//     };

//   return (
//     <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//       {addresses.map(({ id }) => (
//         <Card
//           style={{ width: "10px", height: "10px" }}
//           itemId={id} // NOTE: itemId is required for track items
//           title={id}
//           key={id}
//           onClick={handleClick(id)}
//           selected={isItemSelected(id)}
//         />
//       ))}
//     </ScrollMenu>
//   );
// }
