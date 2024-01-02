import { useState } from 'react';
import './App.css';
import Table from './Table';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [account, setAccount] = useState();
  const [newData, setNewData] = useState({
     name: "",
     phone: "",
     industry:"",
     fax:"",
     accountNumber:"",
     website:""
     });
  const [dataPresent, setDataPresent] = useState(false);
  
  const addAccount = (e) =>{
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setNewData({
      name: "",
      phone: "",
      industry:"",
      fax:"",
      accountNumber:"",
      website:""
      });
    setShowModal(false);
  }

  const getAccount = async()=>{ 
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(json => setAccount(json))
        .finally(() => {
          console.log("fetched account data");
    }, [])

  }

  const sortData = (sortRow, sortOrder) => {
    console.log(sortRow, sortOrder);
    if (sortRow) {
        const sorted = [...account].sort((a, b) => {
         return (
          a[sortRow].toString().localeCompare(b[sortRow].toString(), "en", {
           numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
         );
        });
        setAccount(sorted);
       }
};

if(!dataPresent){
  getAccount();
  setDataPresent(true);
}

  return (
    <div className="App">
      <h1>Salesforce Table App</h1>
      <div className='flex-container'>
        <div className='button-container'>
        <button className='btn-addNew' onClick={() => setShowModal(true)}>Add New</button>
        <button className='btn-refresh' onClick={() => getAccount()}>Refresh List</button>
      </div>
      <div>      
        { account &&(
          <Table account={account} sortData={sortData}/>
        )}
      </div>
      </div>
      <div>
      {showModal && (
        <div className='modal-container'>
          <div className='modal'>
            <h3>Account Information</h3>
            <form onSubmit={addAccount}>
              <div>
              <section>
                <label htmlFor='name'>Account Name</label>
                <input 
                  required
                  id='name'
                  type='text'
                  onChange={(e) =>setNewData
                    ({...newData,name: e.target.value,})
                    }
                  />
                  <label htmlFor='industry'>Industry</label>
                <input 
                  id='industry'
                  type='text'
                  onChange={(e) =>setNewData
                    ({...newData,industry: e.target.value,})
                    }
                  />
                  <label htmlFor='accountNo'>Account Number</label>
                <input 
                  id='accountNo'
                  type='text'
                  onChange={(e) =>setNewData
                    ({...newData,accountNumber: e.target.value,})
                    }
                  />
                
              </section>
              <section>
                <label htmlFor='phone'>Phone</label>
                <input 
                  id='phone'
                  type='text'
                  onChange={(e) =>setNewData
                    ({...newData,phone: e.target.value,})
                    }
                />                
                <label htmlFor='fax'>Fax</label>
                <input 
                  id='fax'
                  type='text'
                  onChange={(e) =>setNewData
                    ({...newData,fax: e.target.value,})
                    }
                />
                <label htmlFor='website'>Website</label>
                <input 
                  id='website'
                  type='text'
                  onChange={(e) =>setNewData
                    ({...newData,website: e.target.value,})
                    }
                />
              </section></div>
              
              <div className='button-group'>
              <button className='btn-cancel' onClick={() => setShowModal(false)} >Cancel</button>
              <button className='btn-submit' type='submit' >Save</button>
              </div>             
              
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
