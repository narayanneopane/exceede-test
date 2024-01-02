import './Table.css';
import TableBody from './TableBody';
import TableHead from './TableHead';
const Table=({account, sortData})=>{
    
    const columns = [
        { label: "", accessor: "id" },
        { label: "Account Name", accessor: "name" },
        { label: "Account Site", accessor: "website" },
        { label: "Billing State/Province", accessor: "email" },
        { label: "Phone", accessor: "phone" },
        { label: "Type", accessor: "username" },
        { label: "Account Owner Alias", accessor: "username" },
       ];
return (
    <>
     <table className="table-style">
      <TableHead columns={columns} sortData={sortData}/>
      <TableBody account={account} columns={columns}/>
     </table>
    </>
   );
};

export default Table;