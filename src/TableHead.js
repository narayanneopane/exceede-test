import { useState } from "react";

const TableHead = (props) => {
    const [sortRow, setSortRow] = useState("");
    const [order, setOrder] = useState("asc");
    const { columns,sortData } = props;

    const handleDataSorting = (accessor) => {
        const sortOrder =
         accessor === sortRow && order === "asc" ? "desc" : "asc";
        setSortRow(accessor);
        setOrder(sortOrder);
        sortData(accessor, sortOrder);
       };

    return (
     <thead>
      <tr>
       {columns.map(({ label, accessor }) => {
        return (
            <th key={accessor} onClick={() => handleDataSorting(accessor)}>
             {label}
            </th>
           );
        })}
      </tr>
     </thead>
    );
   };


   
   export default TableHead;